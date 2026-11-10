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
} from '@carbon/ibm-products';
import './SingleAddSelectWithHierarchy.scss';

const blockClass = `single-add-select-with-hierarchy-pattern`;

/**
 * SingleAddSelectWithHierarchy Pattern - A complete pattern with Tearsheet for single selection with hierarchical navigation
 */

export interface SingleAddSelectWithHierarchyProps {
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
   * Callback when an item is submitted
   */
  onSubmit?: (itemId: string, value: string) => void;
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
   * Root breadcrumb title
   */
  rootBreadcrumbTitle?: string;
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
   * Success notification subtitle template
   */
  successNotificationSubtitle?: string;
  /**
   * Optional class name
   */
  className?: string;
}

interface NavigationStackItem {
  items: AddSelectItem[];
  parentId: string;
  parentTitle: string;
}

export const SingleAddSelectWithHierarchy = forwardRef<
  HTMLDivElement,
  SingleAddSelectWithHierarchyProps
>(
  (
    {
      open,
      setOpen,
      items,
      onSubmit,
      title = 'Select category',
      description = 'Choose one category from the list below',
      itemsLabel = 'Categories',
      globalSearchLabel = 'Search',
      globalSearchPlaceholder = 'Search...',
      searchResultsTitle = 'Search results',
      noResultsTitle = 'No results found',
      noResultsDescription = 'Try adjusting your search or browse categories',
      rootBreadcrumbTitle = 'Categories',
      primaryButtonText = 'Select',
      secondaryButtonText = 'Cancel',
      successNotificationTitle = 'Item Selected',
      successNotificationSubtitle = 'Selected: {value}',
      className,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Initialize data manager
    const dataManager = useMemo(() => new AddSelectData(), []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState<string>();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<AddSelectItem[]>([]);
    const [currentItems, setCurrentItems] = useState<AddSelectItem[]>([]);
    const [navigationStack, setNavigationStack] = useState<
      NavigationStackItem[]
    >([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Initialize data manager with items
    useEffect(() => {
      dataManager.setItems(items);
      const rootItems = dataManager.getItems();
      setFilteredItems(rootItems);
      setCurrentItems(rootItems);
    }, [items, dataManager]);

    // Reset state when tearsheet opens
    useEffect(() => {
      if (open) {
        setSelectedId(undefined);
        setSelectedValue('');
        setSearchTerm('');
        setNavigationStack([]);
        const rootItems = dataManager.getItems();
        setFilteredItems(rootItems);
        setCurrentItems(rootItems);
      }
    }, [open, dataManager]);

    // Handle item selection
    const handleItemSelect = (
      itemId: string,
      selected: boolean,
      value: string
    ) => {
      if (selected) {
        setSelectedId(itemId);
        setSelectedValue(value);
        dataManager.setSelectedItems(itemId, true);
      } else {
        setSelectedId(undefined);
        setSelectedValue('');
        dataManager.clearSelections();
      }
    };

    // Handle search
    const handleSearch = (term: string) => {
      setSearchTerm(term);

      if (term) {
        const results = dataManager.search(term, {
          caseSensitive: false,
          searchFields: ['title', 'value'],
        });
        setFilteredItems(results);
      } else {
        setFilteredItems(currentItems);
      }
    };

    // Handle navigation to children
    const handleNavigate = (
      itemId: string,
      title: string,
      parentId: string
    ) => {
      const children = dataManager.getItemChildren(itemId);

      if (children.length > 0) {
        setNavigationStack((prev) => [
          ...prev,
          {
            items: currentItems,
            parentId: parentId || '',
            parentTitle: title,
          },
        ]);

        setCurrentItems(children);
        setFilteredItems(children);
        setSearchTerm('');
        setSelectedId(undefined);
        setSelectedValue('');
      }
    };

    // Handle breadcrumb click
    const handleBreadcrumbClick = (index: number) => {
      const levelsToGoBack = navigationStack.length - index;

      if (levelsToGoBack > 0) {
        const newStack = navigationStack.slice(0, index);
        setNavigationStack(newStack);

        if (index === 0) {
          const rootItems = dataManager.getItems();
          setCurrentItems(rootItems);
          setFilteredItems(rootItems);
        } else {
          const targetLevel = navigationStack[index - 1];
          setCurrentItems(targetLevel.items);
          setFilteredItems(targetLevel.items);
        }

        setSearchTerm('');
        setSelectedId(undefined);
        setSelectedValue('');
      }
    };

    // Build breadcrumb path
    const breadcrumbPath = useMemo(() => {
      const path = [{ id: 'root', title: rootBreadcrumbTitle }];

      navigationStack.forEach((item) => {
        path.push({ id: item.parentId, title: item.parentTitle });
      });

      return path;
    }, [navigationStack, rootBreadcrumbTitle]);

    // Create selected items set
    const selectedItems = useMemo(() => {
      const set = new Set<string>();
      if (selectedId) {
        set.add(selectedId);
      }
      return set;
    }, [selectedId]);

    // Handle close
    const handleClose = () => {
      setOpen(false);
    };

    // Handle submit
    const handleSubmit = () => {
      if (selectedId) {
        onSubmit?.(selectedId, selectedValue);
        handleClose();

        // Show success notification
        const message = successNotificationSubtitle.replace(
          '{value}',
          selectedValue
        );
        setNotificationMessage(message);
        setShowNotification(true);
      }
    };

    return (
      <>
        <AddSelect
          onItemSelect={handleItemSelect}
          selectedItems={selectedItems}
          {...rest}
        >
          <Tearsheet
            ref={ref}
            open={open}
            onClose={handleClose}
            variant="narrow"
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
                  itemCount={filteredItems.length}
                  onSearch={handleSearch}
                  path={breadcrumbPath}
                  onBreadcrumbClick={handleBreadcrumbClick}
                >
                  <AddSelect.Column onNavigate={handleNavigate} hideSearch>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => {
                        const hasChildren = dataManager.hasChildren(item.id);

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
                          />
                        );
                      })
                    ) : (
                      <div className={`${blockClass}__no-results`}>
                        <h4>{noResultsTitle}</h4>
                        <p>{noResultsDescription}</p>
                      </div>
                    )}
                  </AddSelect.Column>
                </AddSelect.Body>
              </Tearsheet.MainContent>
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
                  disabled: !selectedId,
                },
              ]}
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

SingleAddSelectWithHierarchy.propTypes = {
  className: PropTypes.string,
  description: PropTypes.node,
  globalSearchLabel: PropTypes.string,
  globalSearchPlaceholder: PropTypes.string,
  /**@ts-ignore */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.shape({
        entries: PropTypes.array,
      }),
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
  /**@ts-ignore */
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  primaryButtonText: PropTypes.string,
  rootBreadcrumbTitle: PropTypes.string,
  searchResultsTitle: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  /**@ts-ignore */
  setOpen: PropTypes.func.isRequired,
  successNotificationSubtitle: PropTypes.string,
  successNotificationTitle: PropTypes.string,
  title: PropTypes.string,
};

SingleAddSelectWithHierarchy.displayName = 'SingleAddSelectWithHierarchy';
