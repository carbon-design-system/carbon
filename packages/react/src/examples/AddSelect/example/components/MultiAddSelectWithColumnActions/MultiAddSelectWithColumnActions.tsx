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
import {
  ToastNotification,
  Dropdown,
  OverflowMenu,
  MenuItem,
  IconButton,
  Popover,
  PopoverContent,
} from '@carbon/react';
import { ArrowsVertical, Filter } from '@carbon/react/icons';
import {
  preview__AddSelect as AddSelect,
  preview__Tearsheet as Tearsheet,
  AddSelectData,
  AddSelectItem,
  NoDataEmptyState,
} from '@carbon/ibm-products';
import './MultiAddSelectWithColumnActions.scss';

const blockClass = `multi-add-select-column-actions-pattern`;

/**
 * MultiAddSelectWithColumnActions Pattern - Multi-selection with column-level filter and sort
 * Uses column-level actionsSlot for filter and sort controls
 * No global actions - all filtering and sorting happens at the column level
 */

export interface MultiAddSelectWithColumnActionsProps {
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
  sortBy?: string[];
  filterBy?: string;
}

/**
 * Controlled Column Component with column-level filter and sort
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
    children: AddSelectItem[],
    sortBy?: string[],
    filterBy?: string
  ) => void;
  selectedItems: Set<string>;
  sortBy?: string[];
  filterBy?: string;
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
  sortBy = [],
  filterBy,
}) => {
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortAttribute, setSortAttribute] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Filter items based on column search and filter
  const filteredItems = useMemo(() => {
    let result = items;

    // Apply column search
    if (columnSearchTerm) {
      result = result.filter((item) => {
        const titleMatch = item.title
          ?.toLowerCase()
          .includes(columnSearchTerm.toLowerCase());
        const valueMatch = item.value
          ?.toLowerCase()
          .includes(columnSearchTerm.toLowerCase());
        return titleMatch || valueMatch;
      });
    }

    // Apply filter if filterBy is defined and filter is not 'all'
    if (filterBy && filterType !== 'all') {
      result = result.filter((item: any) => item[filterBy] === filterType);
    }

    return result;
  }, [items, columnSearchTerm, filterBy, filterType]);

  // Apply sort to filtered items
  const sortedItems = useMemo(() => {
    if (!sortAttribute || !sortDirection) {
      return filteredItems;
    }

    return [...filteredItems].sort((a: any, b: any) => {
      const aVal = a[sortAttribute];
      const bVal = b[sortAttribute];

      if (aVal === undefined || bVal === undefined) return 0;

      // Handle numeric sorting
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Handle string sorting
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (sortDirection === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [filteredItems, sortAttribute, sortDirection]);

  const handleColumnSearch = (term: string) => {
    setColumnSearchTerm(term);
  };

  // Handle navigation to children
  const handleNavigate = (itemId: string, title: string, parentId: string) => {
    const parent = items.find((item) => item.id === itemId);
    const children = parent?.children?.entries || [];
    const childSortBy = (parent?.children as any)?.sortBy;
    const childFilterBy = (parent?.children as any)?.filterBy;

    if (children.length > 0) {
      onNavigateToChild?.(itemId, title, children, childSortBy, childFilterBy);
    }
  };

  // Get unique filter values from items
  const filterOptions = useMemo(() => {
    if (!filterBy) return [];

    const uniqueValues = new Set<string>();
    items.forEach((item: any) => {
      if (item[filterBy]) {
        uniqueValues.add(item[filterBy]);
      }
    });

    return [
      { id: 'all', text: 'All types' },
      ...Array.from(uniqueValues).map((value) => ({
        id: value,
        text: value.toUpperCase(),
      })),
    ];
  }, [items, filterBy]);

  // Sort options based on sortBy prop
  const sortOptions = useMemo(() => {
    if (!sortBy || sortBy.length === 0) return [];

    return sortBy.flatMap((attr) => [
      {
        id: `${attr}-asc`,
        label: attr.charAt(0).toUpperCase() + attr.slice(1),
        attribute: attr,
        direction: 'asc' as const,
      },
      {
        id: `${attr}-desc`,
        label: attr.charAt(0).toUpperCase() + attr.slice(1),
        attribute: attr,
        direction: 'desc' as const,
      },
    ]);
  }, [sortBy]);

  // Column actions slot with filter and sort
  const columnActions = (
    <div className={`${blockClass}__column-actions`}>
      {filterBy && filterOptions.length > 0 && (
        <Popover
          open={filterPanelOpen}
          onRequestClose={() => setFilterPanelOpen(false)}
          align="bottom-right"
          caret={false}
        >
          <IconButton
            kind="ghost"
            label="Filter"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            size="md"
          >
            <Filter />
          </IconButton>
          <PopoverContent className={`${blockClass}__filter-panel`}>
            <div className={`${blockClass}__filter-panel-content`}>
              <h6 className={`${blockClass}__filter-panel-title`}>
                Filter by type
              </h6>
              <Dropdown
                id={`filter-${level}`}
                titleText=""
                label="Select type"
                items={filterOptions}
                itemToString={(item) => (item ? item.text : '')}
                selectedItem={filterOptions.find(
                  (opt) => opt.id === filterType
                )}
                onChange={({ selectedItem }) => {
                  setFilterType(selectedItem?.id || 'all');
                  setFilterPanelOpen(false);
                }}
                size="md"
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
      {sortBy && sortBy.length > 0 && (
        <OverflowMenu
          renderIcon={(props) => <ArrowsVertical size={16} {...props} />}
          iconDescription="Sort"
          flipped
          aria-label="Sort options"
          size="md"
        >
          {sortOptions.map((opt) => (
            <MenuItem
              key={opt.id}
              label={`${opt.label} ${opt.direction === 'asc' ? '↑' : '↓'}`}
              onClick={() => {
                setSortAttribute(opt.attribute);
                setSortDirection(opt.direction);
              }}
            />
          ))}
        </OverflowMenu>
      )}
    </div>
  );

  return (
    <AddSelect.Column
      title={columnTitle}
      searchPlaceholder={columnSearchPlaceholder}
      onSearch={handleColumnSearch}
      itemCount={sortedItems.length}
      multi={true}
      onNavigate={handleNavigate}
      showSelectAll={false}
      actionsSlot={
        (filterBy && filterOptions.length > 0) || (sortBy && sortBy.length > 0)
          ? columnActions
          : undefined
      }
    >
      {sortedItems.map((item) => {
        const hasChildren =
          item.children?.entries && item.children.entries.length > 0;
        return (
          <AddSelect.Row
            key={item.id}
            itemId={item.id}
            title={item.title || ''}
            subtitle={item.subtitle}
            value={item.value || ''}
            icon={item.icon}
            disabled={item.disabled}
            hasChildren={hasChildren}
            hasItemPanel={!!item.itemDetails}
            onItemPanelClick={onShowInfo}
          />
        );
      })}
    </AddSelect.Column>
  );
};

export const MultiAddSelectWithColumnActions = forwardRef<
  HTMLDivElement,
  MultiAddSelectWithColumnActionsProps
>(
  (
    {
      open,
      setOpen,
      items,
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
        setSelectedIds(new Set());
        setSearchTerm('');
        setInfoPanel({ item: null, show: false });
        setNavigationLevels([]);
        setBreadcrumbPath([{ id: 'root', title: rootBreadcrumbTitle }]);
      }
    }, [open, rootBreadcrumbTitle]);

    // Handle item selection
    const handleItemSelect = (
      itemId: string,
      selected: boolean,
      value: string
    ) => {
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
        // Reset to root items when search is cleared
        setCurrentItems(items);
        setNavigationLevels([]);
        setBreadcrumbPath([{ id: 'root', title: rootBreadcrumbTitle }]);
      }
    };

    // Handle navigation to child level with smart column management
    const handleNavigateToChild = (
      itemId: string,
      title: string,
      children: AddSelectItem[],
      sortBy?: string[],
      filterBy?: string
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
          sortBy,
          filterBy,
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

    // Get sortBy and filterBy for root level
    const rootSortBy = (items as any).sortBy;
    const rootFilterBy = (items as any).filterBy;

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
                  layout="horizontal"
                >
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
                        sortBy={rootSortBy}
                        filterBy={rootFilterBy}
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
                          sortBy={navLevel.sortBy}
                          filterBy={navLevel.filterBy}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={`${blockClass}__no-results`}>
                      <h4>{noResultsTitle}</h4>
                      <p>{noResultsDescription}</p>
                    </div>
                  )}
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
                        useAccordion={true}
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

MultiAddSelectWithColumnActions.propTypes = {
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

MultiAddSelectWithColumnActions.displayName = 'MultiAddSelectWithColumnActions';
