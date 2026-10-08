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
  Dropdown,
  Layer,
  MultiSelect,
  ToastNotification,
  IconButton,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { Edit, TrashCan } from '@carbon/icons-react';
import {
  preview__AddSelect as AddSelect,
  preview__Tearsheet as Tearsheet,
  AddSelectData,
  AddSelectItem,
  NoDataEmptyState,
  StackProvider,
} from '@carbon/ibm-products';
import './MultiSelectWithBulkActions.scss';

const blockClass = `multi-add-select-with-bulk-actions-pattern`;

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

export interface MultiSelectWithBulkActionsProps {
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

export const MultiSelectWithBulkActions = forwardRef<
  HTMLDivElement,
  MultiSelectWithBulkActionsProps
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

    // Bulk edit state
    const [editTearsheetOpen, setEditTearsheetOpen] = useState(false);
    const [batchSelectedIds, setBatchSelectedIds] = useState<Set<string>>(
      new Set()
    );
    const [tempModifierStates, setTempModifierStates] = useState<ModifierState>(
      {}
    );

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
        setEditTearsheetOpen(false);
        setBatchSelectedIds(new Set());
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

    // Handle open edit tearsheet
    const handleOpenEditTearsheet = () => {
      // Copy current modifier states to temp states
      setTempModifierStates({ ...modifierStates });
      setBatchSelectedIds(new Set());
      setEditTearsheetOpen(true);
    };

    // Handle close edit tearsheet
    const handleCloseEditTearsheet = () => {
      setEditTearsheetOpen(false);
      setBatchSelectedIds(new Set());
    };

    // Handle save edit tearsheet
    const handleSaveEditTearsheet = () => {
      // Apply temp modifier states to actual modifier states
      setModifierStates({ ...tempModifierStates });
      setEditTearsheetOpen(false);
      setBatchSelectedIds(new Set());
    };

    // Handle batch select all
    const handleBatchSelectAll = () => {
      if (batchSelectedIds.size === selectedItemsForDisplay.length) {
        setBatchSelectedIds(new Set());
      } else {
        setBatchSelectedIds(
          new Set(selectedItemsForDisplay.map((item) => item.id))
        );
      }
    };

    // Handle batch select row
    const handleBatchSelectRow = (itemId: string) => {
      const newBatchSelectedIds = new Set(batchSelectedIds);
      if (newBatchSelectedIds.has(itemId)) {
        newBatchSelectedIds.delete(itemId);
      } else {
        newBatchSelectedIds.add(itemId);
      }
      setBatchSelectedIds(newBatchSelectedIds);
    };

    // Handle batch remove
    const handleBatchRemove = () => {
      const newSelectedIds = new Set(selectedIds);
      const newModifierStates = { ...modifierStates };

      batchSelectedIds.forEach((id) => {
        newSelectedIds.delete(id);
        delete newModifierStates[id];
        dataManager.setSelectedItems(id, false);
      });

      setSelectedIds(newSelectedIds);
      setModifierStates(newModifierStates);
      setBatchSelectedIds(new Set());
      setEditTearsheetOpen(false);
    };

    // Handle batch assign role
    const handleBatchAssignRole = (role: string | string[]) => {
      const newTempModifierStates = { ...tempModifierStates };

      batchSelectedIds.forEach((id) => {
        newTempModifierStates[id] = role;
      });

      setTempModifierStates(newTempModifierStates);
    };

    // Handle temp modifier change in edit tearsheet
    const handleTempModifierChange = (
      itemId: string,
      value: string | string[]
    ) => {
      setTempModifierStates((prev) => ({
        ...prev,
        [itemId]: value,
      }));
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
      <StackProvider>
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
                                    autoAlign
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
                                    autoAlign
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
                    headerActions={
                      selectedItemsForDisplay.length > 0 ? (
                        <IconButton
                          autoAlign
                          label="Edit selection"
                          align="bottom"
                          onClick={handleOpenEditTearsheet}
                          kind="ghost"
                          size="sm"
                        >
                          <Edit />
                        </IconButton>
                      ) : undefined
                    }
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
                } as any,
                {
                  kind: 'primary',
                  label: primaryButtonText,
                  onClick: handleSubmit,
                  disabled: selectedIds.size === 0,
                } as any,
              ]}
              buttonSize="2xl"
            />
          </Tearsheet>
        </AddSelect>

        {/* Stacked Edit Tearsheet for Bulk Actions */}
        <Tearsheet
          open={editTearsheetOpen}
          onClose={handleCloseEditTearsheet}
          variant="wide"
          className={`${blockClass}__edit-tearsheet`}
        >
          <Tearsheet.Header hideCloseButton disableHeaderCollapse>
            <Tearsheet.HeaderContent title="Edit selection">
              Review and edit your selection lorem ipsum dolor information.
            </Tearsheet.HeaderContent>
          </Tearsheet.Header>

          <Tearsheet.Body>
            <Tearsheet.MainContent isFlush>
              <div className={`${blockClass}__edit-content`}>
                <TableContainer>
                  <TableToolbar>
                    <TableBatchActions
                      totalSelected={batchSelectedIds.size}
                      onCancel={() => setBatchSelectedIds(new Set())}
                      shouldShowBatchActions={batchSelectedIds.size > 0}
                    >
                      <TableBatchAction
                        renderIcon={TrashCan}
                        iconDescription="Remove selected items"
                        onClick={handleBatchRemove}
                      >
                        Remove
                      </TableBatchAction>
                      <div className={`${blockClass}__batch-role-action`}>
                        <MultiSelect
                          autoAlign
                          id="batch-role-multiselect"
                          titleText=""
                          label="Assign role"
                          type="inline"
                          items={modifierConfig.options}
                          onChange={({ selectedItems }) => {
                            if (selectedItems && selectedItems.length > 0) {
                              handleBatchAssignRole(selectedItems);
                            }
                          }}
                          size="sm"
                        />
                      </div>
                    </TableBatchActions>
                    <TableToolbarContent />
                  </TableToolbar>
                  <Table size="md" useZebraStyles={false}>
                    <TableHead>
                      <TableRow>
                        <TableSelectAll
                          id="batch-select-all"
                          name="batch-select-all"
                          checked={
                            batchSelectedIds.size ===
                              selectedItemsForDisplay.length &&
                            selectedItemsForDisplay.length > 0
                          }
                          indeterminate={
                            batchSelectedIds.size > 0 &&
                            batchSelectedIds.size <
                              selectedItemsForDisplay.length
                          }
                          onSelect={handleBatchSelectAll}
                          aria-label="Select all rows"
                        />
                        <TableHeader>User</TableHeader>
                        <TableHeader>Role</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedItemsForDisplay.map((item) => {
                        const isRowSelected = batchSelectedIds.has(item.id);
                        const currentModifierValue =
                          tempModifierStates[item.id] ||
                          item[modifierConfig.id] ||
                          [];

                        return (
                          <TableRow key={item.id} isSelected={isRowSelected}>
                            <TableSelectRow
                              id={`batch-select-${item.id}`}
                              name={`batch-select-${item.id}`}
                              checked={isRowSelected}
                              onSelect={() => handleBatchSelectRow(item.id)}
                              aria-label={`Select ${item.title}`}
                            />
                            <TableCell>
                              <div className={`${blockClass}__edit-user`}>
                                {item.icon && (
                                  <div
                                    className={`${blockClass}__edit-user-icon`}
                                  >
                                    {item.icon}
                                  </div>
                                )}
                                <div
                                  className={`${blockClass}__edit-user-info`}
                                >
                                  <div
                                    className={`${blockClass}__edit-user-name`}
                                  >
                                    {item.title}
                                  </div>
                                  {item.subtitle && (
                                    <div
                                      className={`${blockClass}__edit-user-email`}
                                    >
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Layer>
                                {modifierConfig.multiSelect ? (
                                  <MultiSelect
                                    autoAlign
                                    id={`edit-modifier-${item.id}`}
                                    titleText=""
                                    type="inline"
                                    label={modifierConfig.label}
                                    items={modifierConfig.options}
                                    initialSelectedItems={
                                      Array.isArray(currentModifierValue)
                                        ? currentModifierValue
                                        : []
                                    }
                                    onChange={({ selectedItems }) =>
                                      handleTempModifierChange(
                                        item.id,
                                        selectedItems || []
                                      )
                                    }
                                    disabled={
                                      batchSelectedIds.size > 0 && isRowSelected
                                    }
                                    size="sm"
                                  />
                                ) : (
                                  <Dropdown
                                    autoAlign
                                    id={`edit-modifier-${item.id}`}
                                    titleText=""
                                    type="inline"
                                    label={modifierConfig.label}
                                    items={modifierConfig.options}
                                    initialSelectedItem={
                                      typeof currentModifierValue === 'string'
                                        ? currentModifierValue
                                        : currentModifierValue[0]
                                    }
                                    onChange={({ selectedItem }) =>
                                      handleTempModifierChange(
                                        item.id,
                                        selectedItem
                                      )
                                    }
                                    disabled={
                                      batchSelectedIds.size > 0 && isRowSelected
                                    }
                                    size="sm"
                                  />
                                )}
                              </Layer>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Tearsheet.MainContent>
          </Tearsheet.Body>

          <Tearsheet.Footer
            actions={[
              {
                kind: 'secondary',
                label: 'Cancel',
                onClick: handleCloseEditTearsheet,
              } as any,
              {
                kind: 'primary',
                label: 'Save',
                onClick: handleSaveEditTearsheet,
              } as any,
            ]}
            buttonSize="2xl"
          />
        </Tearsheet>

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
      </StackProvider>
    );
  }
);

MultiSelectWithBulkActions.propTypes = {
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

MultiSelectWithBulkActions.displayName = 'MultiAddSelectWithModifiers';
