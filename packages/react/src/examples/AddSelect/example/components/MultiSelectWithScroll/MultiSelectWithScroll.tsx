/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  ForwardedRef,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ToastNotification } from '@carbon/react';
import {
  preview__AddSelect as AddSelect,
  preview__Tearsheet as Tearsheet,
  AddSelectData,
  AddSelectItem,
  NoDataEmptyState,
} from '@carbon/ibm-products';
import './MultiSelectWithScroll.scss';

const blockClass = `multi-select-with-scroll-pattern`;

/**
 * A sentinel used to represent in-flight skeleton rows in the display list.
 * We keep it as a plain object so a single `.map()` can render both real and
 * skeleton rows without a second collection.
 */
interface SkeletonSentinel {
  id: string;
  skeleton: true;
}

type DisplayItem = AddSelectItem | SkeletonSentinel;

const isSkeletonSentinel = (item: DisplayItem): item is SkeletonSentinel =>
  'skeleton' in item && (item as SkeletonSentinel).skeleton === true;

// Number of skeleton rows appended while loading
const SKELETON_COUNT = 3;
const SKELETON_ID_PREFIX = '__skeleton__';

// Scroll trigger threshold: load more when past this fraction of scrollable height
const SCROLL_THRESHOLD = 2 / 3;

// Simulated async page-fetch delay (ms)
const FETCH_DELAY_MS = 600;

// ─────────────────────────────────────────────────────────────────────────────

export interface MultiSelectWithScrollProps {
  /** Whether the tearsheet is open */
  open: boolean;
  /** Callback to set open state */
  setOpen: (open: boolean) => void;
  /** Full item dataset (all pages, loaded into memory) */
  items: AddSelectItem[];
  /** Number of items per page loaded on each scroll trigger */
  pageSize?: number;
  /** Callback when items are submitted */
  onSubmit?: (itemIds: string[], values: string[]) => void;
  /** Title for the tearsheet */
  title?: string;
  /** Description for the tearsheet */
  description?: ReactNode;
  /** Label for the items section sub-header */
  itemsLabel?: string;
  /** Global search label */
  globalSearchLabel?: string;
  /** Global search placeholder */
  globalSearchPlaceholder?: string;
  /** Title shown when search is active */
  searchResultsTitle?: string;
  /** No-results title */
  noResultsTitle?: string;
  /** No-results description */
  noResultsDescription?: string;
  /** Title for the selection summary panel */
  selectionSummaryTitle?: string;
  /** Empty-state title when nothing is selected */
  noSelectionTitle?: string;
  /** Empty-state description when nothing is selected */
  noSelectionDescription?: string;
  /** Primary action button text */
  primaryButtonText?: string;
  /** Secondary action button text */
  secondaryButtonText?: string;
  /** Toast notification title on successful submit */
  successNotificationTitle?: string;
  /** Toast notification subtitle template; use {count} for item count */
  successNotificationSubtitle?: string;
  /** Optional CSS class name */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export const MultiSelectWithScroll = forwardRef<
  HTMLDivElement,
  MultiSelectWithScrollProps
>(
  (
    {
      open,
      setOpen,
      items,
      pageSize = 20,
      onSubmit,
      title = 'Add users as collaborators',
      description = 'Select users from the list lorem ipsum dolor infotext.',
      itemsLabel = 'Users',
      globalSearchLabel = 'Find users',
      globalSearchPlaceholder = 'Find users',
      searchResultsTitle = 'Search results',
      noResultsTitle = 'No results found',
      noResultsDescription = 'Try adjusting your search',
      selectionSummaryTitle = 'Selected users',
      noSelectionTitle = 'No users selected',
      noSelectionDescription = 'Select users to include the full set of the governance artifacts it contains in the governance scope.',
      primaryButtonText = 'Add',
      secondaryButtonText = 'Cancel',
      successNotificationTitle = 'Success',
      successNotificationSubtitle = '{count} user{plural} added',
      className,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const dataManager = useMemo(() => new AddSelectData(), []);

    // --- Selection state ---
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // --- Pagination / infinite-scroll state ---
    const [displayedItems, setDisplayedItems] = useState<DisplayItem[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const loadedCountRef = useRef(0); // sync ref to avoid stale closure in loadNextPage
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false); // sync ref to avoid stale closure in scroll handler

    // --- Search state ---
    const [searchTerm, setSearchTerm] = useState('');
    const isSearchActiveRef = useRef(false);

    // --- Notification state ---
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // --- Info panel state ---
    const [infoPanel, setInfoPanel] = useState<{
      item: AddSelectItem | null;
      show: boolean;
    }>({ item: null, show: false });

    // Ref forwarded to AddSelect.Body — gives us a DOM anchor for scroll detection.
    const bodyRef = useRef<HTMLDivElement>(null);
    // The element we attach the scroll listener to (found once on open).
    const scrollElRef = useRef<HTMLElement | null>(null);
    // Latest handleScroll, kept current via a ref so the stable listener below
    // always calls the most-recent version without needing to be re-registered.
    const handleScrollRef = useRef<(e: Event) => void>(() => {});
    // The actual listener function passed to addEventListener/removeEventListener.
    const stableScrollListener = useRef<(e: Event) => void>((e) =>
      handleScrollRef.current(e)
    );

    // ── Data initialization ──────────────────────────────────────
    useEffect(() => {
      dataManager.setItems(items);
    }, [items, dataManager]);

    // ── Reset on open ────────────────────────────────────────────
    useEffect(() => {
      if (open) {
        setSelectedIds(new Set());
        setSearchTerm('');
        isSearchActiveRef.current = false;
        setInfoPanel({ item: null, show: false });
        // Load first page
        const firstPage = items.slice(0, pageSize);
        setDisplayedItems(firstPage);
        loadedCountRef.current = firstPage.length;
        setLoadedCount(firstPage.length);
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    }, [open, items, pageSize]);

    // ── Load next page (simulated async) ─────────────────────────
    const loadNextPage = useCallback(async () => {
      if (isLoadingRef.current) return;
      const currentLoaded = loadedCountRef.current;
      if (currentLoaded >= items.length) return;

      isLoadingRef.current = true;
      setIsLoading(true);

      // Append skeleton sentinels
      const skeletons: SkeletonSentinel[] = Array.from(
        { length: SKELETON_COUNT },
        (_, i) => ({
          id: `${SKELETON_ID_PREFIX}${i}`,
          skeleton: true as const,
        })
      );
      setDisplayedItems((prev) => [...prev, ...skeletons]);

      // Simulate network latency
      await new Promise<void>((resolve) => setTimeout(resolve, FETCH_DELAY_MS));

      const nextItems = items.slice(currentLoaded, currentLoaded + pageSize);
      const newLoaded = currentLoaded + nextItems.length;

      setDisplayedItems((prev) => {
        // Replace skeleton sentinels with real items
        const withoutSkeletons = prev.filter((i) => !isSkeletonSentinel(i));
        return [...withoutSkeletons, ...nextItems];
      });
      loadedCountRef.current = newLoaded;
      setLoadedCount(newLoaded);
      isLoadingRef.current = false;
      setIsLoading(false);
    }, [items, pageSize]);

    // ── Scroll handler ───────────────────────────────────────────
    const handleScroll = useCallback(
      (e: Event) => {
        if (isSearchActiveRef.current) return;
        const target = e.currentTarget as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const scrollable = scrollHeight - clientHeight;
        if (scrollable <= 0) return;
        const fraction = scrollTop / scrollable;
        if (fraction >= SCROLL_THRESHOLD) {
          loadNextPage();
        }
      },
      [loadNextPage]
    );

    // Keep the stable ref in sync with the latest handleScroll.
    useEffect(() => {
      handleScrollRef.current = handleScroll;
    }, [handleScroll]);

    // ── Locate the scroll container once on open ─────────────────
    // AddSelectBody's __content child div has overflow:auto and is the
    // height-constrained element that actually scrolls inside the tearsheet.
    // We query it directly from the Body ref rather than walking the tree.
    useEffect(() => {
      if (!open) {
        // Tearsheet closed — remove listener and forget the element
        if (scrollElRef.current) {
          scrollElRef.current.removeEventListener(
            'scroll',
            stableScrollListener.current
          );
          scrollElRef.current = null;
        }
        return;
      }

      // Tearsheet is opening. Wait one animation frame for the portal DOM to
      // be fully committed before querying the content element.
      const frameId = requestAnimationFrame(() => {
        if (!bodyRef.current || scrollElRef.current) return;

        const contentEl = bodyRef.current.querySelector(
          '[class*="__content"]'
        ) as HTMLElement | null;
        if (contentEl) {
          scrollElRef.current = contentEl;
          contentEl.addEventListener('scroll', stableScrollListener.current);
        }
      });

      return () => cancelAnimationFrame(frameId);
    }, [open]);

    // ── Item selection ───────────────────────────────────────────
    const handleItemSelect = (
      itemId: string,
      selected: boolean,
      value: string
    ) => {
      const next = new Set(selectedIds);
      if (selected) {
        next.add(itemId);
        dataManager.setSelectedItems(itemId, true);
      } else {
        next.delete(itemId);
        dataManager.setSelectedItems(itemId, false);
      }
      setSelectedIds(next);
    };

    // ── Search ───────────────────────────────────────────────────
    const handleSearch = (term: string) => {
      setSearchTerm(term);
      isSearchActiveRef.current = !!term;

      if (term) {
        // During search: show all matching items from full dataset immediately
        const results = dataManager.search(term, {
          caseSensitive: false,
          searchFields: ['title', 'value', 'subtitle'],
        });
        setDisplayedItems(results);
      } else {
        // Restore paginated view – show only what was loaded so far
        setDisplayedItems(items.slice(0, loadedCountRef.current));
      }
    };

    // ── Misc handlers ────────────────────────────────────────────
    const handleRemoveItem = (itemId: string) => {
      const item = dataManager.getItem(itemId);
      if (item) {
        handleItemSelect(itemId, false, item.value || '');
      }
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
      if (selectedIds.size > 0) {
        const selectedIdsArray = Array.from(selectedIds);
        const selectedValues = selectedIdsArray.map(
          (id) => dataManager.getItem(id)?.value || ''
        );
        onSubmit?.(selectedIdsArray, selectedValues);
        handleClose();

        const count = selectedIds.size;
        const message = successNotificationSubtitle
          .replace('{count}', count.toString())
          .replace('{plural}', count > 1 ? 's' : '');
        setNotificationMessage(message);
        setShowNotification(true);
      }
    };

    const handleShowInfo = (itemId: string) => {
      const item = dataManager.getItem(itemId);
      if (item?.itemDetails) {
        setInfoPanel({ item, show: true });
      }
    };

    const handleCloseInfo = () => setInfoPanel({ item: null, show: false });

    // ── Derived data ─────────────────────────────────────────────
    const selectedItemsForDisplay = useMemo(
      () =>
        Array.from(selectedIds)
          .map((id) => dataManager.getItem(id))
          .filter((item): item is AddSelectItem => item !== undefined),
      [selectedIds, dataManager]
    );

    const hasMore = loadedCount < items.length;

    // ─────────────────────────────────────────────────────────────
    return (
      <>
        <AddSelect
          onItemSelect={handleItemSelect}
          selectedItems={selectedIds}
          {...rest}
        >
          <Tearsheet
            ref={ref}
            open={open}
            onClose={handleClose}
            variant="wide"
            summaryContentWidth="22.5rem"
            className={cx(blockClass, className)}
          >
            <Tearsheet.Header hideCloseButton disableHeaderCollapse>
              <Tearsheet.HeaderContent title={title}>
                {description}
              </Tearsheet.HeaderContent>
            </Tearsheet.Header>

            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush>
                <AddSelect.Body
                  ref={bodyRef}
                  itemsLabel={itemsLabel}
                  globalSearchLabel={globalSearchLabel}
                  globalSearchPlaceholder={globalSearchPlaceholder}
                  searchResultsTitle={searchResultsTitle}
                  // Always show the total count so the user knows how many items exist
                  itemCount={items.length}
                  onSearch={handleSearch}
                >
                  <AddSelect.Column multi hideSearch>
                    {displayedItems.length > 0 ? (
                      displayedItems.map((item) => {
                        if (isSkeletonSentinel(item)) {
                          return (
                            <AddSelect.Row
                              key={item.id}
                              itemId={item.id}
                              title=""
                              value=""
                              icon={<span />}
                              skeleton
                            />
                          );
                        }
                        return (
                          <AddSelect.Row
                            key={item.id}
                            itemId={item.id}
                            title={item.title || ''}
                            subtitle={item.subtitle}
                            value={item.value || ''}
                            icon={item.icon}
                            disabled={item.disabled}
                            hasItemPanel={!!item.itemDetails}
                            onItemPanelClick={handleShowInfo}
                          />
                        );
                      })
                    ) : (
                      <div className={`${blockClass}__no-results`}>
                        <h4>{noResultsTitle}</h4>
                        <p>{noResultsDescription}</p>
                      </div>
                    )}

                    {/* Bottom spacer provides the scroll hint half-row */}
                    {!isLoading && hasMore && !searchTerm && (
                      <div
                        className={`${blockClass}__scroll-hint-spacer`}
                        aria-hidden="true"
                      />
                    )}
                  </AddSelect.Column>
                </AddSelect.Body>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent isFlush>
                {infoPanel.show && infoPanel.item ? (
                  <AddSelect.ItemPanel
                    title="User details"
                    item={infoPanel.item}
                    onClose={handleCloseInfo}
                    closeIconDescription="Close details"
                  />
                ) : (
                  <AddSelect.SelectionSummary
                    title={selectionSummaryTitle}
                    selectedItemCount={selectedItemsForDisplay.length}
                    emptyState={
                      <div
                        style={{ marginBlockStart: '3rem', padding: '1rem' }}
                      >
                        <NoDataEmptyState
                          illustrationTheme="light"
                          size="sm"
                          title={noSelectionTitle}
                          subtitle={noSelectionDescription}
                        />
                      </div>
                    }
                  >
                    {selectedItemsForDisplay.map((item) => (
                      <AddSelect.SelectionSummaryItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        useAccordion
                      />
                    ))}
                  </AddSelect.SelectionSummary>
                )}
              </Tearsheet.SummaryContent>
            </Tearsheet.Body>

            <Tearsheet.Footer
              actions={[
                {
                  kind: 'secondary',
                  label: secondaryButtonText,
                  onClick: handleClose,
                },
                {
                  kind: 'primary',
                  label: primaryButtonText,
                  onClick: handleSubmit,
                  disabled: selectedIds.size === 0,
                },
              ]}
              buttonSize="2xl"
            />
          </Tearsheet>
        </AddSelect>

        {showNotification && (
          <ToastNotification
            aria-label="closes notification"
            caption={new Date().toLocaleTimeString()}
            className={`${blockClass}__notification`}
            kind="success"
            lowContrast
            onClose={() => setShowNotification(false)}
            role="status"
            statusIconDescription="notification"
            subtitle={notificationMessage}
            title={successNotificationTitle}
          />
        )}
      </>
    );
  }
);

MultiSelectWithScroll.propTypes = {
  className: PropTypes.string,
  description: PropTypes.node,
  globalSearchLabel: PropTypes.string,
  globalSearchPlaceholder: PropTypes.string,
  /**@ts-ignore */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.node,
      id: PropTypes.string.isRequired,
      itemDetails: PropTypes.object,
      subtitle: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  itemsLabel: PropTypes.string,
  noResultsDescription: PropTypes.string,
  noResultsTitle: PropTypes.string,
  noSelectionDescription: PropTypes.string,
  noSelectionTitle: PropTypes.string,
  /**@ts-ignore */
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  pageSize: PropTypes.number,
  primaryButtonText: PropTypes.string,
  searchResultsTitle: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  selectionSummaryTitle: PropTypes.string,
  /**@ts-ignore */
  setOpen: PropTypes.func.isRequired,
  successNotificationSubtitle: PropTypes.string,
  successNotificationTitle: PropTypes.string,
  title: PropTypes.string,
};

MultiSelectWithScroll.displayName = 'MultiSelectWithScroll';
