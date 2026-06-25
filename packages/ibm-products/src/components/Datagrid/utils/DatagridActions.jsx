/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Add,
  ChevronDown,
  Download,
  Filter,
  Restart,
} from '@carbon/react/icons';
import {
  Button,
  ComposedModal,
  Dropdown,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
  TableToolbarContent,
  TableToolbarSearch,
  MenuButton,
  MenuItem,
} from '@carbon/react';
import React, { useState } from 'react';
import { useIsomorphicEffect } from '../../../global/js/hooks';

import { action } from 'storybook/actions';
import { pkg } from '../../../settings';
import { useFilterContext } from '../Datagrid/addons/Filtering/hooks';

const blockClass = `${pkg.prefix}--datagrid`;
export const DatagridActions = (datagridState) => {
  const { setPanelOpen } = useFilterContext();
  const {
    selectedFlatRows,
    setGlobalFilter,
    CustomizeColumnsButton,
    RowSizeDropdown,
    rowSizeDropdownProps,
    useDenseHeader,
    filterProps,
    getFilterFlyoutProps,
    FilterFlyout,
    data,
  } = datagridState;
  const downloadCsv = () => {
    alert('Downloading...');
  };
  const refreshColumns = () => {
    alert('refreshing...');
  };

  const searchForAColumn = 'Search';
  const isNothingSelected = selectedFlatRows.length === 0;

  const renderFilterFlyout = () =>
    filterProps?.variation === 'flyout' && (
      <FilterFlyout {...getFilterFlyoutProps()} />
    );

  const renderFilterPanelButton = () =>
    filterProps?.variation === 'panel' && (
      <IconButton
        kind="ghost"
        align={filterProps.align}
        label={filterProps.panelIconDescription}
        className={`${blockClass}-filter-panel-open-button`}
        onClick={() => setPanelOpen((open) => !open)}
        disabled={data.length === 0}
      >
        <Filter />
      </IconButton>
    );

  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  useIsomorphicEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const mobileToolbar = size < 672 ? true : false;
  const items = ['Option 1', 'Option 2', 'Option 3'];
  return (
    isNothingSelected &&
    (useDenseHeader && useDenseHeader ? (
      <TableToolbarContent size="sm">
        {!mobileToolbar ? (
          <>
            {renderFilterPanelButton()}
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={Download}
              iconDescription={'Download CSV'}
              onClick={downloadCsv}
            />
            {renderFilterFlyout()}
            {CustomizeColumnsButton && <CustomizeColumnsButton />}
            <RowSizeDropdown {...rowSizeDropdownProps} />
            <div className={`${blockClass}__toolbar-divider`}>
              <Button kind="ghost" renderIcon={Add} iconDescription={'Action'}>
                Ghost button
              </Button>
            </div>
          </>
        ) : (
          <OverflowMenu aria-label="Tools" size="md" flipped>
            <OverflowMenuItem
              itemText="Filter"
              hasDivider
              requireTitle
              onClick={() => setModalOpen(true)}
            />
            <OverflowMenuItem itemText="Export" hasDivider requireTitle />
            <OverflowMenuItem itemText="Settings" hasDivider requireTitle />
            <OverflowMenuItem itemText="Import items" hasDivider requireTitle />
            <OverflowMenuItem itemText="Create" hasDivider requireTitle />
          </OverflowMenu>
        )}
      </TableToolbarContent>
    ) : !mobileToolbar ? (
      <TableToolbarContent>
        {renderFilterPanelButton()}
        <TableToolbarSearch
          size="lg"
          id="columnSearch"
          persistent
          placeholder={searchForAColumn}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {renderFilterFlyout()}

        <Button
          kind="ghost"
          hasIconOnly
          tooltipPosition="bottom"
          renderIcon={Restart}
          iconDescription={'Refresh'}
          onClick={refreshColumns}
        />

        <Button
          kind="ghost"
          hasIconOnly
          tooltipPosition="bottom"
          renderIcon={Download}
          iconDescription={'Download CSV'}
          onClick={downloadCsv}
        />

        {CustomizeColumnsButton && <CustomizeColumnsButton />}
        <RowSizeDropdown {...rowSizeDropdownProps} />
        <MenuButton
          label="Primary button"
          className={`${blockClass}__toolbar-options`}
        >
          <MenuItem
            label="Option 1"
            onClick={action(`Click on ButtonMenu Option 1`)}
          />
          <MenuItem
            label="Option 2"
            onClick={action(`Click on ButtonMenu Option 2`)}
          />
          <MenuItem
            label="Option 3"
            onClick={action(`Click on ButtonMenu Option 3`)}
          />
        </MenuButton>
      </TableToolbarContent>
    ) : (
      <TableToolbarContent>
        {renderFilterPanelButton()}
        <TableToolbarSearch
          size="xl"
          id="columnSearch"
          persistent
          placeholder={searchForAColumn}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {renderFilterFlyout()}
        <OverflowMenu
          aria-label="Tools"
          size="lg"
          flipped
          renderIcon={ChevronDown}
          className={`${blockClass}__toolbar-menu__trigger`}
          menuOptionsClass={`${blockClass}__toolbar-options`}
        >
          <OverflowMenuItem
            itemText="Filter"
            hasDivider
            requireTitle
            onClick={() => setModalOpen(true)}
          />
          <OverflowMenuItem itemText="Export" hasDivider requireTitle />
          <OverflowMenuItem itemText="Settings" hasDivider requireTitle />
          <OverflowMenuItem itemText="Import items" hasDivider requireTitle />
          <OverflowMenuItem itemText="Create" hasDivider requireTitle />
        </OverflowMenu>
        {modalOpen && (
          <ComposedModal
            size="lg"
            open={modalOpen && modalOpen}
            onClose={() => setModalOpen(false)}
            className={`${blockClass}__mobile-toolbar-modal`}
          >
            <ModalHeader>
              <h4>Filters</h4>
            </ModalHeader>
            <ModalBody>
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter1"
              />
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter2"
              />
              <Dropdown
                initialSelectedItem={items[2]}
                items={items}
                titleText="Label"
                id="filter3"
              />
            </ModalBody>
            <ModalFooter
              primaryButtonText="Apply"
              secondaryButtonText="Cancel"
            />
          </ComposedModal>
        )}
      </TableToolbarContent>
    ))
  );
};
