/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TearsheetNarrow } from '../../../../Tearsheet';
import Columns from './Columns';
import Actions from './Actions';
import { pkg } from '../../../../../settings';
import { useCallback } from 'react';

const blockClass = `${pkg.prefix}--datagrid`;

const CustomizeColumnsTearsheet = ({
  isOpen,
  setIsTearsheetOpen,
  launcherButtonRef,
  onSaveColumnPrefs,
  columnDefinitions,
  originalColumnDefinitions,
  customizeTearsheetHeadingLabel = 'Customize columns',
  primaryButtonTextLabel = 'Save',
  secondaryButtonTextLabel = 'Cancel',
  instructionsLabel = 'Select columns to display them. Click and drag the box to reorder the columns. These specifications will be saved and persist if you leave and return to the data table.',
  findColumnPlaceholderLabel = 'Find column',
  resetToDefaultLabel = 'Reset to default',
  assistiveTextInstructionsLabel = 'Press space bar to toggle drag drop mode, use arrow keys to move selected elements.',
  assistiveTextDisabledInstructionsLabel = 'Reordering columns are disabled because they are filtered currently.',
  selectAllLabel = 'Column name',
}) => {
  const [visibleColumnsCount, setVisibleColumnsCount] = useState('');
  const [totalColumns, setTotalColumns] = useState('');
  const [searchText, setSearchText] = useState('');
  const [columnObjects, setColumnObjects] = useState(columnDefinitions);
  const [isDirty, setIsDirty] = useState(false);
  const prevColumnDefinitions = useRef(undefined);

  const onRequestClose = () => {
    setColumnObjects(columnDefinitions);
    setIsTearsheetOpen(false);
  };

  const onRequestSubmit = () => {
    setIsTearsheetOpen(false);
    const updatedColumns = columnObjects.map((colDef) => ({
      id: colDef.id,
      isVisible: colDef.isVisible,
    }));
    onSaveColumnPrefs(updatedColumns);
  };

  const onCheckboxCheck = (col, value) => {
    // Update the visibility of columns based on a single column or an array of columns
    const changedDefinitions = columnObjects.map((definition) => {
      // If select all is clicked
      if (Array.isArray(col)) {
        return col.includes(definition) &&
          definition.canFilter &&
          !definition.disabled
          ? { ...definition, isVisible: value }
          : definition;
      }
      // If a single checkbox is clicked which is written below as a default return
      return col.id === definition.id
        ? { ...definition, isVisible: value }
        : definition;
    });

    // Count the number of visible columns excluding certain IDs after 1st mutation
    const selectedColumnsCount = changedDefinitions.filter(
      (definition) =>
        definition.isVisible &&
        !['datagridSelection', 'actions'].includes(definition.id)
    ).length;

    // Ensure special columns are visible if any other columns are visible
    const finalDefinitions = changedDefinitions.map((definition) => {
      // If at least 1 column is visible after mutation, we add selection column and actions column (coming from various extensions)
      if (selectedColumnsCount > 0) {
        return ['datagridSelection', 'actions'].includes(definition.id)
          ? { ...definition, isVisible: true }
          : definition;
      }
      // Else we remove selection column and actions column
      return ['datagridSelection', 'actions'].includes(definition.id)
        ? { ...definition, isVisible: false }
        : definition;
    });

    setColumnObjects(finalDefinitions);
    setIsDirty(selectedColumnsCount !== 0);
  };

  const getVisibleColumnsCount = useCallback(() => {
    return columnObjects.filter((col) => col.isVisible).length;
  }, [columnObjects]);

  const string = searchText.trim().toLowerCase();

  useEffect(() => {
    // prevent this effect from running when columns are being resized
    if (!isOpen) {
      return;
    }
    if (prevColumnDefinitions.current !== columnDefinitions) {
      setColumnObjects(columnDefinitions);
    }
    const actionCount = columnObjects.filter(
      (col) => col.id === 'actions'
    ).length;
    const datagridSelectionCount = columnObjects.filter(
      (col) => col.id === 'datagridSelection'
    ).length;
    setVisibleColumnsCount(
      getVisibleColumnsCount() - actionCount - datagridSelectionCount < 0
        ? 0
        : getVisibleColumnsCount() - actionCount - datagridSelectionCount
    );

    setTotalColumns(
      columnObjects.length - actionCount - datagridSelectionCount
    );
    prevColumnDefinitions.current = columnDefinitions;
  }, [getVisibleColumnsCount, columnObjects, columnDefinitions]);

  return (
    <TearsheetNarrow
      className={`${blockClass}__customize-columns-tearsheet`}
      open={isOpen}
      title={`${customizeTearsheetHeadingLabel} (${visibleColumnsCount}/${totalColumns})`}
      description={instructionsLabel}
      launcherButtonRef={launcherButtonRef}
      actions={[
        {
          kind: 'secondary',
          label: secondaryButtonTextLabel,
          onClick: onRequestClose,
        },
        {
          kind: 'primary',
          label: primaryButtonTextLabel,
          onClick: onRequestSubmit,
          disabled: !isDirty,
        },
      ]}
    >
      <Actions
        columns={columnObjects}
        originalColumnDefinitions={originalColumnDefinitions}
        searchText={searchText}
        setColumnsObject={(cols) => {
          setColumnObjects(cols);
          setIsDirty(true);
        }}
        setSearchText={setSearchText}
        findColumnPlaceholderLabel={findColumnPlaceholderLabel}
        resetToDefaultLabel={resetToDefaultLabel}
      />
      {isOpen && (
        <Columns
          assistiveTextInstructionsLabel={assistiveTextInstructionsLabel}
          assistiveTextDisabledInstructionsLabel={
            assistiveTextDisabledInstructionsLabel
          }
          getVisibleColumnsCount={getVisibleColumnsCount}
          columns={columnObjects}
          filterString={string}
          onSelectColumn={onCheckboxCheck}
          setColumnsObject={(cols) => {
            setColumnObjects(cols);
            setIsDirty(getVisibleColumnsCount() !== 0);
          }}
          selectAllLabel={selectAllLabel}
          customizeTearsheetHeadingLabel={customizeTearsheetHeadingLabel}
        />
      )}
    </TearsheetNarrow>
  );
};

CustomizeColumnsTearsheet.propTypes = {
  assistiveTextDisabledInstructionsLabel: PropTypes.string,
  assistiveTextInstructionsLabel: PropTypes.string,
  columnDefinitions: PropTypes.array.isRequired,
  customizeTearsheetHeadingLabel: PropTypes.string,
  findColumnPlaceholderLabel: PropTypes.string,
  instructionsLabel: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onSaveColumnPrefs: PropTypes.func.isRequired,
  originalColumnDefinitions: PropTypes.array.isRequired,
  primaryButtonTextLabel: PropTypes.string,
  resetToDefaultLabel: PropTypes.string,
  secondaryButtonTextLabel: PropTypes.string,
  selectAllLabel: PropTypes.string,
  setIsTearsheetOpen: PropTypes.func.isRequired,
};

export default CustomizeColumnsTearsheet;
