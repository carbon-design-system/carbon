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
import './MultiAddSelectWithHierarchyNoSelectAll.scss';

const blockClass = `multi-add-select-hierarchy-no-select-all-pattern`;

/**
 * MultiAddSelectWithHierarchyNoSelectAll Pattern - Multi-selection with hierarchy without select-all
 * Uses recursive column generation to display hierarchy levels side-by-side
 * No select-all checkbox - only individual item selection allowed
 */

export interface MultiAddSelectWithHierarchyNoSelectAllProps {
  /**
   * Whether the tearsheet is open
   */
  open: boolean;
  /**
   * Callback to set open state
   */
  setOpen: (open: boolean) => void;
  /**
   * Array of hierarchical items to display
   */
  items: AddSelectItem[];
  /**
   * Array of pre-selected item IDs that should appear as disabled with checkmark
   */
  preSelectedItemIds?: string[];
  /**
   * Callback when items are submitted
   */
  onSubmit?: (itemIds: string[], values: string[]) => void;
  /**
   * Title for the tearsheet
   */
  title?: string;
  /**
   * Description for the tearsheet
   */
  description?: ReactNode;
  /**
   * Label for items section
   */
  itemsLabel?: string;
  /**
   * Global search label
   */
  globalSearchLabel?: string;
  /**
   * Global search placeholder
   */
  globalSearchPlaceholder?: string;
  /**
   * Search results title
   */
  searchResultsTitle?: string;
  /**
   * No results title
   */
  noResultsTitle?: string;
  /**
   * No results description
   */
  noResultsDescription?: string;
  /**
   * Title for the selection summary panel
   */
  selectionSummaryTitle?: string;
  /**
   * Empty state title when no items selected
   */
  noSelectionTitle?: string;
  /**
   * Empty state description when no items selected
   */
  noSelectionDescription?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Success notification title
   */
  successNotificationTitle?: string;
  /**
   * Success notification subtitle template (use {count} for item count)
   */
  successNotificationSubtitle?: string;
  /**
   * Placeholder for column search
   */
  columnSearchPlaceholder?: string;
  /**
   * Column title
   */
  columnTitle?: string;
  /**
   * Root breadcrumb title
   */
  rootBreadcrumbTitle?: string;
  /**
   * Optional class name
   */
  className?: string;
}

/**
 * Navigation level interface for tracking hierarchy
 */
interface NavigationLevel {
  items: AddSelectItem[];
  parentId: string;
  parentTitle: string;
}

/**
 * Controlled Column Component
 * Renders a single column with items, controlled by parent state
 * NO SELECT ALL functionality
 */
interface ColumnProps {
  items: AddSelectItem[];
  onShowInfo?: (itemId: string) => void;
  columnSearchPlaceholder?: string;
  columnTitle: string;
  level: number;
  dataManager: AddSelectData;
  onNavigateToChild?: (
    itemId: string,
    title: string,
    children: AddSelectItem[]
  ) => void;
  selectedItems: Set<string>;
  preSelectedItems: Set<string>;
}

const ControlledColumn: React.FC<ColumnProps> = ({
  items,
  onShowInfo,
  columnSearchPlaceholder = 'Find',
  columnTitle,
  level,
  dataManager,
  onNavigateToChild,
  selectedItems,
  preSelectedItems,
}) => {
  const [columnSearchTerm, setColumnSearchTerm] = useState('');

  // Filter items based on column search
  const filteredItems = useMemo(() => {
    if (!columnSearchTerm) {
      return items;
    }
    return items.filter((item) => {
      const titleMatch = item.title
        ?.toLowerCase()
        .includes(columnSearchTerm.toLowerCase());
      const valueMatch = item.value
        ?.toLowerCase()
        .includes(columnSearchTerm.toLowerCase());
      return titleMatch || valueMatch;
    });
  }, [items, columnSearchTerm]);

  const handleColumnSearch = (term: string) => {
    setColumnSearchTerm(term);
  };

  // Handle navigation to children
  const handleNavigate = (itemId: string, title: string, parentId: string) => {
    const parent = items.find((item) => item.id === itemId);
    const children = parent?.children?.entries || [];

    if (children.length > 0) {
      onNavigateToChild?.(itemId, title, children);
    }
  };

  return (
    <AddSelect.Column
      title={columnTitle}
      searchPlaceholder={columnSearchPlaceholder}
      onSearch={handleColumnSearch}
      itemCount={filteredItems.length}
      multi={true}
      onNavigate={handleNavigate}
      showSelectAll={false}
    >
      {filteredItems.map((item) => {
        const hasChildren =
          item.children?.entries && item.children.entries.length > 0;
        const isPreSelected = preSelectedItems.has(item.id);
        return (
          <AddSelect.Row
            key={item.id}
            itemId={item.id}
            title={item.title || ''}
            subtitle={item.subtitle}
            value={item.value || ''}
            icon={item.icon}
            disabled={item.disabled || isPreSelected}
            hasChildren={hasChildren}
            hasItemPanel={!!item.itemDetails}
            onItemPanelClick={onShowInfo}
          />
        );
      })}
    </AddSelect.Column>
  );
};

export const MultiAddSelectWithHierarchyNoSelectAll = forwardRef<
  HTMLDivElement,
  MultiAddSelectWithHierarchyNoSelectAllProps
>(
  (
    {
      open,
      setOpen,
      items,
      preSelectedItemIds = [],
      onSubmit,
      title = 'Add items',
      description = 'Select items from the list below',
      itemsLabel = 'Items',
      globalSearchLabel = 'Search',
      globalSearchPlaceholder = 'Search items',
      searchResultsTitle = 'Search results',
      noResultsTitle = 'No results found',
      noResultsDescription = 'Try adjusting your search',
      selectionSummaryTitle = 'Selected items',
      noSelectionTitle = 'No items selected',
      noSelectionDescription = 'Select items from the list',
      primaryButtonText = 'Add',
      secondaryButtonText = 'Cancel',
      successNotificationTitle = 'Success',
      successNotificationSubtitle = '{count} item{plural} added',
      columnSearchPlaceholder = 'Find',
      columnTitle,
      rootBreadcrumbTitle = 'Items',
      className,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Initialize data manager
    const dataManager = useMemo(() => new AddSelectData(), []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [preSelectedIds] = useState<Set<string>>(new Set(preSelectedItemIds));
    const [currentItems, setCurrentItems] = useState<AddSelectItem[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [infoPanel, setInfoPanel] = useState<{
      item: AddSelectItem | null;
      show: boolean;
    }>({ item: null, show: false });

    // Navigation state for breadcrumbs and column management
    const [navigationLevels, setNavigationLevels] = useState<NavigationLevel[]>(
      []
    );
    const [breadcrumbPath, setBreadcrumbPath] = useState<
      Array<{ id: string; title: string }>
    >([{ id: 'root', title: rootBreadcrumbTitle }]);

    // Initialize data manager with items
    useEffect(() => {
      dataManager.setItems(items);
      setCurrentItems(items);
    }, [items, dataManager]);

    // Reset state when tearsheet opens
    useEffect(() => {
      if (open) {
        // Initialize with pre-selected items
        setSelectedIds(new Set(preSelectedItemIds));
        setSearchTerm('');
        setInfoPanel({ item: null, show: false });
        setNavigationLevels([]);
        setBreadcrumbPath([{ id: 'root', title: rootBreadcrumbTitle }]);
      }
    }, [open, rootBreadcrumbTitle, preSelectedItemIds]);

    // Handle item selection
    const handleItemSelect = (
      itemId: string,
      selected: boolean,
      value: string
    ) => {
      // Prevent selection/deselection of pre-selected items
      if (preSelectedIds.has(itemId)) {
        return;
      }

      const newSelectedIds = new Set(selectedIds);

      if (selected) {
        newSelectedIds.add(itemId);
        dataManager.setSelectedItems(itemId, true);
      } else {
        newSelectedIds.delete(itemId);
        dataManager.setSelectedItems(itemId, false);
      }

      setSelectedIds(newSelectedIds);
    };

    // Handle global search
    const handleGlobalSearch = (term: string) => {
      setSearchTerm(term);

      if (term) {
        // Use the data manager's search functionality
        const results = dataManager.search(term, {
          caseSensitive: false,
          searchFields: ['title', 'value', 'subtitle'],
        });
        setCurrentItems(results);
        // Clear navigation when searching
        setNavigationLevels([]);
      } else {
        // Reset to root items
        setCurrentItems(items);
        setNavigationLevels([]);
        setBreadcrumbPath([{ id: 'root', title: rootBreadcrumbTitle }]);
      }
    };

    // Handle navigation to child level with smart column management
    const handleNavigateToChild = (
      itemId: string,
      title: string,
      children: AddSelectItem[]
    ) => {
      setNavigationLevels((prev) => {
        // Find which column the clicked item is in
        let sourceColumnIndex = -1;

        // Check if it's in the root items (column 0)
        if (currentItems.some((item) => item.id === itemId)) {
          sourceColumnIndex = 0;
        } else {
          // Check which navigation level contains this item
          for (let i = 0; i < prev.length; i++) {
            if (prev[i].items.some((item) => item.id === itemId)) {
              sourceColumnIndex = i + 1; // +1 because root is 0
              break;
            }
          }
        }

        const newLevel = {
          items: children,
          parentId: itemId,
          parentTitle: title,
        };

        // If clicking from root column (first column)
        if (sourceColumnIndex === 0) {
          // Check if we already have 2 columns (total 3 with root)
          if (prev.length >= 2) {
            // Replace the second column, remove the third
            return [newLevel];
          } else if (prev.length === 1) {
            // We have 2 columns total, replace the second
            return [newLevel];
          } else {
            // We only have root, add first child column
            return [newLevel];
          }
        }

        // If clicking from second column
        if (sourceColumnIndex === 1) {
          // Check if column already exists for this item
          if (prev.length >= 2 && prev[1].parentId === itemId) {
            // Same item, don't add duplicate
            return prev;
          }
          // Replace the third column if it exists, otherwise add it
          return [prev[0], newLevel];
        }

        // If clicking from third column
        if (sourceColumnIndex === 2) {
          // Check if column already exists for this item
          if (prev.length >= 3 && prev[2].parentId === itemId) {
            // Same item, don't add duplicate
            return prev;
          }
          // Replace the third column
          return [prev[0], prev[1], newLevel];
        }

        // Fallback: just add to the end
        return [...prev, newLevel];
      });

      // Update breadcrumb path
      setBreadcrumbPath((prev) => {
        // Find if this item already exists in breadcrumb
        const existingIndex = prev.findIndex((crumb) => crumb.id === itemId);

        if (existingIndex !== -1) {
          // Item exists, truncate to that point
          return prev.slice(0, existingIndex + 1);
        }

        // Determine the correct breadcrumb depth based on navigation levels
        // Root is always index 0, so we need to manage the path carefully
        let sourceColumnIndex = -1;

        // Check if it's in the root items
        if (currentItems.some((item) => item.id === itemId)) {
          sourceColumnIndex = 0;
        } else {
          // Check navigation levels
          navigationLevels.forEach((level, i) => {
            if (level.items.some((item) => item.id === itemId)) {
              sourceColumnIndex = i + 1;
            }
          });
        }

        // Build appropriate breadcrumb path
        if (sourceColumnIndex === 0) {
          // Clicking from root, breadcrumb should be: root -> new item
          return [prev[0], { id: itemId, title }];
        } else if (sourceColumnIndex > 0 && sourceColumnIndex < prev.length) {
          // Clicking from middle column, truncate and add
          return [
            ...prev.slice(0, sourceColumnIndex + 1),
            { id: itemId, title },
          ];
        }

        // Default: append to end
        return [...prev, { id: itemId, title }];
      });
    };

    // Handle breadcrumb click to navigate back
    const handleBreadcrumbClick = (index: number) => {
      if (index === 0) {
        // Navigate back to root
        setNavigationLevels([]);
        setBreadcrumbPath([{ id: 'root', title: rootBreadcrumbTitle }]);
      } else {
        // Navigate to specific level (index - 1 because root is index 0)
        const targetLevelIndex = index - 1;
        setNavigationLevels((prev) => prev.slice(0, targetLevelIndex + 1));
        setBreadcrumbPath((prev) => prev.slice(0, index + 1));
      }
    };

    // Handle removing item from selection summary
    const handleRemoveItem = (itemId: string) => {
      const item = dataManager.getItem(itemId);
      if (item) {
        handleItemSelect(itemId, false, item.value || '');
      }
    };

    // Handle close
    const handleClose = () => {
      setOpen(false);
    };

    // Handle submit
    const handleSubmit = () => {
      if (selectedIds.size > 0) {
        const selectedIdsArray = Array.from(selectedIds);
        const selectedValues = selectedIdsArray.map((id) => {
          const item = dataManager.getItem(id);
          return item?.value || '';
        });

        onSubmit?.(selectedIdsArray, selectedValues);
        handleClose();

        // Show success notification
        const count = selectedIds.size;
        const message = successNotificationSubtitle
          .replace('{count}', count.toString())
          .replace('{plural}', count > 1 ? 's' : '');
        setNotificationMessage(message);
        setShowNotification(true);
      }
    };

    // Handle show info
    const handleShowInfo = (itemId: string) => {
      const item = dataManager.getItem(itemId);
      if (item && item.itemDetails) {
        setInfoPanel({ item, show: true });
      }
    };

    // Handle close info
    const handleCloseInfo = () => {
      setInfoPanel({ item: null, show: false });
    };

    // Get selected items for display
    const selectedItemsForDisplay = useMemo(() => {
      return Array.from(selectedIds)
        .map((id) => dataManager.getItem(id))
        .filter((item): item is AddSelectItem => item !== undefined);
    }, [selectedIds, dataManager]);

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
                  itemsLabel={itemsLabel}
                  globalSearchLabel={globalSearchLabel}
                  globalSearchPlaceholder={globalSearchPlaceholder}
                  searchResultsTitle={searchResultsTitle}
                  itemCount={currentItems.length}
                  onSearch={handleGlobalSearch}
                  path={searchTerm ? [] : breadcrumbPath}
                  onBreadcrumbClick={handleBreadcrumbClick}
                >
                  <AddSelect.Content layout="horizontal">
                    {currentItems.length > 0 ? (
                      <>
                        {/* First column - root level */}
                        <ControlledColumn
                          items={currentItems}
                          onShowInfo={handleShowInfo}
                          columnSearchPlaceholder={columnSearchPlaceholder}
                          columnTitle={columnTitle || itemsLabel}
                          level={1}
                          dataManager={dataManager}
                          onNavigateToChild={handleNavigateToChild}
                          selectedItems={selectedIds}
                          preSelectedItems={preSelectedIds}
                        />

                        {/* Additional columns based on navigation levels */}
                        {navigationLevels.map((navLevel, index) => (
                          <ControlledColumn
                            key={`${navLevel.parentId}-${index}`}
                            items={navLevel.items}
                            onShowInfo={handleShowInfo}
                            columnSearchPlaceholder={columnSearchPlaceholder}
                            columnTitle={navLevel.parentTitle}
                            level={index + 2}
                            dataManager={dataManager}
                            onNavigateToChild={handleNavigateToChild}
                            selectedItems={selectedIds}
                            preSelectedItems={preSelectedIds}
                          />
                        ))}
                      </>
                    ) : (
                      <div className={`${blockClass}__no-results`}>
                        <h4>{noResultsTitle}</h4>
                        <p>{noResultsDescription}</p>
                      </div>
                    )}
                  </AddSelect.Content>
                </AddSelect.Body>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent isFlush>
                {infoPanel.show && infoPanel.item ? (
                  <AddSelect.ItemPanel
                    title="Item details"
                    item={infoPanel.item}
                    onClose={handleCloseInfo}
                    closeIconDescription="Close details"
                  />
                ) : (
                  <AddSelect.SelectionSummary
                    title={selectionSummaryTitle}
                    selectedItems={selectedItemsForDisplay}
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
                    {selectedItemsForDisplay.map((item) => {
                      const isPreSelected = preSelectedIds.has(item.id);
                      return (
                        <AddSelect.SelectionSummaryItem
                          key={item.id}
                          item={item}
                          onRemove={
                            isPreSelected ? undefined : handleRemoveItem
                          }
                          useAccordion={true}
                        />
                      );
                    })}
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
            className="notification"
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

MultiAddSelectWithHierarchyNoSelectAll.propTypes = {
  className: PropTypes.string,
  columnSearchPlaceholder: PropTypes.string,
  columnTitle: PropTypes.string,
  description: PropTypes.node,
  globalSearchLabel: PropTypes.string,
  globalSearchPlaceholder: PropTypes.string,
  /**@ts-ignore */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.node,
      id: PropTypes.string.isRequired,
      itemDetails: PropTypes.node,
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
  /**@ts-ignore */
  open: PropTypes.bool.isRequired,
  /**@ts-ignore */
  preSelectedItemIds: PropTypes.arrayOf(PropTypes.string),
  primaryButtonText: PropTypes.string,
  rootBreadcrumbTitle: PropTypes.string,
  searchResultsTitle: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  selectionSummaryTitle: PropTypes.string,
  /**@ts-ignore */
  setOpen: PropTypes.func.isRequired,
  successNotificationSubtitle: PropTypes.string,
  successNotificationTitle: PropTypes.string,
  title: PropTypes.string,
};

MultiAddSelectWithHierarchyNoSelectAll.displayName =
  'MultiAddSelectWithHierarchyNoSelectAll';
