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
import { Dropdown, Layer, MultiSelect, ToastNotification } from '@carbon/react';
import {
  preview__AddSelect as AddSelect,
  preview__Tearsheet as Tearsheet,
  AddSelectData,
  AddSelectItem,
  NoDataEmptyState,
} from '@carbon/ibm-products';
import './MultiAddSelectWithModifiers.scss';

const blockClass = `multi-add-select-with-modifiers-pattern`;

/**
 * MultiAddSelectWithModifiers Pattern - A complete pattern with Tearsheet for multi-selection with modifiers
 */

export interface ModifierConfig {
  id: string;
  label: string;
  title: string;
  options: string[];
  multiSelect?: boolean;
}

interface ItemWithModifier extends AddSelectItem {
  [key: string]: any;
}

interface ModifierState {
  [itemId: string]: string | string[];
}

export interface MultiAddSelectWithModifiersProps {
  /**
   * Whether the tearsheet is open
   */
  open: boolean;
  /**
   * Callback to set open state
   */
  setOpen: (open: boolean) => void;
  /**
   * Array of items to display
   */
  items: ItemWithModifier[];
  /**
   * Modifier configuration
   */
  modifierConfig: ModifierConfig;
  /**
   * Callback when items are submitted with their modifier values
   */
  onSubmit?: (
    itemIds: string[],
    values: string[],
    modifiers: ModifierState
  ) => void;
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
   * Optional class name
   */
  className?: string;
}

export const MultiAddSelectWithModifiers = forwardRef<
  HTMLDivElement,
  MultiAddSelectWithModifiersProps
>(
  (
    {
      open,
      setOpen,
      items,
      modifierConfig,
      onSubmit,
      title = 'Add items with modifiers',
      description = 'Select items and assign modifiers',
      itemsLabel = 'Items',
      globalSearchLabel = 'Search',
      globalSearchPlaceholder = 'Search items',
      searchResultsTitle = 'Search results',
      noResultsTitle = 'No results found',
      noResultsDescription = 'Try adjusting your search',
      selectionSummaryTitle = 'Selected items',
      noSelectionTitle = 'No items selected',
      noSelectionDescription = 'Select items from the list and assign modifiers',
      primaryButtonText = 'Add',
      secondaryButtonText = 'Cancel',
      successNotificationTitle = 'Success',
      successNotificationSubtitle = '{count} item{plural} added with modifiers',
      className,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Initialize data manager
    const dataManager = useMemo(() => new AddSelectData(), []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [filteredItems, setFilteredItems] = useState<ItemWithModifier[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [modifierStates, setModifierStates] = useState<ModifierState>({});
    const [infoPanel, setInfoPanel] = useState<{
      item: AddSelectItem | null;
      show: boolean;
    }>({ item: null, show: false });

    // Initialize data manager with items
    useEffect(() => {
      dataManager.setItems(items);
      const rootItems = dataManager.getItems();
      setFilteredItems(rootItems as ItemWithModifier[]);

      // Initialize modifier states with default values from items
      const initialModifiers: ModifierState = {};
      items.forEach((item) => {
        if (item[modifierConfig.id]) {
          initialModifiers[item.id] = item[modifierConfig.id];
        }
      });
      setModifierStates(initialModifiers);
    }, [items, dataManager, modifierConfig.id]);

    // Reset state when tearsheet opens
    useEffect(() => {
      if (open) {
        setSelectedIds(new Set());
        setSearchTerm('');
        setInfoPanel({ item: null, show: false });
        // Reset modifier states to initial values
        const initialModifiers: ModifierState = {};
        items.forEach((item) => {
          if (item[modifierConfig.id]) {
            initialModifiers[item.id] = item[modifierConfig.id];
          }
        });
        setModifierStates(initialModifiers);
      }
    }, [open, items, modifierConfig.id]);

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

    // Handle modifier change
    const handleModifierChange = (itemId: string, value: string | string[]) => {
      setModifierStates((prev) => ({
        ...prev,
        [itemId]: value,
      }));
    };

    // Handle search
    const handleSearch = (term: string) => {
      setSearchTerm(term);

      if (term) {
        const results = dataManager.search(term, {
          caseSensitive: false,
          searchFields: ['title', 'value', 'subtitle'],
        });
        setFilteredItems(results as ItemWithModifier[]);
      } else {
        const rootItems = dataManager.getItems();
        setFilteredItems(rootItems as ItemWithModifier[]);
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

        onSubmit?.(selectedIdsArray, selectedValues, modifierStates);
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
        .map((id) => {
          const item = dataManager.getItem(id);
          if (item) {
            return {
              ...item,
              [modifierConfig.id]:
                modifierStates[id] || item[modifierConfig.id] || [],
            };
          }
          return undefined;
        })
        .filter((item): item is ItemWithModifier => item !== undefined);
    }, [selectedIds, dataManager, modifierStates, modifierConfig.id]);

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
                  itemCount={filteredItems.length}
                  onSearch={handleSearch}
                >
                  <AddSelect.Column multi={true} hideSearch>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => {
                        const isSelected = selectedIds.has(item.id);
                        const currentModifierValue =
                          modifierStates[item.id] ||
                          item[modifierConfig.id] ||
                          [];

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
                          >
                            <div className={`${blockClass}__modifier`}>
                              <Layer>
                                {modifierConfig.multiSelect ? (
                                  <MultiSelect
                                    id={`modifier-${item.id}`}
                                    titleText={modifierConfig.title}
                                    type="inline"
                                    label={modifierConfig.label}
                                    items={modifierConfig.options}
                                    initialSelectedItems={
                                      Array.isArray(currentModifierValue)
                                        ? currentModifierValue
                                        : []
                                    }
                                    onChange={({ selectedItems }) =>
                                      handleModifierChange(
                                        item.id,
                                        selectedItems || []
                                      )
                                    }
                                    disabled={!isSelected}
                                    size="sm"
                                  />
                                ) : (
                                  <Dropdown
                                    id={`modifier-${item.id}`}
                                    titleText={modifierConfig.title}
                                    type="inline"
                                    label={modifierConfig.label}
                                    items={modifierConfig.options}
                                    initialSelectedItem={
                                      typeof currentModifierValue === 'string'
                                        ? currentModifierValue
                                        : currentModifierValue[0]
                                    }
                                    onChange={({ selectedItem }) =>
                                      handleModifierChange(
                                        item.id,
                                        selectedItem
                                      )
                                    }
                                    disabled={!isSelected}
                                    size="sm"
                                  />
                                )}
                              </Layer>
                            </div>
                          </AddSelect.Row>
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
                    {selectedItemsForDisplay.map((item) => {
                      const modifierValue = item[modifierConfig.id];
                      const modifierDisplay = Array.isArray(modifierValue)
                        ? modifierValue.join(', ')
                        : modifierValue || 'None';

                      return (
                        <AddSelect.SelectionSummaryItem
                          key={item.id}
                          item={item}
                          onRemove={handleRemoveItem}
                          useAccordion={true}
                          renderAccordionTitle={(item) => (
                            <div className={`${blockClass}__summary-title`}>
                              <span className={`${blockClass}__summary-name`}>
                                {item.title}
                              </span>
                              <span
                                className={`${blockClass}__summary-modifier-value`}
                              >
                                {modifierDisplay}
                              </span>
                            </div>
                          )}
                          renderAccordionBody={(item) => (
                            <div className={`${blockClass}__summary-content`}>
                              {item.subtitle && (
                                <div className={`${blockClass}__summary-field`}>
                                  <strong>Email:</strong> {item.subtitle}
                                </div>
                              )}
                              {item.value && (
                                <div className={`${blockClass}__summary-field`}>
                                  <strong>ID:</strong> {item.value}
                                </div>
                              )}
                            </div>
                          )}
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

MultiAddSelectWithModifiers.propTypes = {
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
      itemDetails: PropTypes.node,
      subtitle: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  itemsLabel: PropTypes.string,
  /**@ts-ignore */
  modifierConfig: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    multiSelect: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  noResultsDescription: PropTypes.string,
  noResultsTitle: PropTypes.string,
  noSelectionDescription: PropTypes.string,
  noSelectionTitle: PropTypes.string,
  /**@ts-ignore */
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
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

MultiAddSelectWithModifiers.displayName = 'MultiAddSelectWithModifiers';
