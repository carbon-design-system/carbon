/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, Checkbox, FormGroup } from '@carbon/react';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { handleCheckboxChange } from './handleCheckboxChange';
import { pkg } from '../../../../../settings';

const blockClass = `${pkg.prefix}--datagrid`;
const componentClass = `${blockClass}-filter-panel`;

const OverflowCheckboxes = ({
  components,
  filtersState,
  column,
  setFiltersState,
  type,
  applyFilters,
  viewAllLabel = 'View all',
  viewLessLabel = 'View less',
}) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const firstFiveItems = filtersState[column].value.slice(0, 5);
  const restOfTheItems = filtersState[column].value.slice(
    5,
    filtersState[column].value.length
  );

  const renderCheckbox = (option) => (
    <Checkbox
      key={option.labelText}
      {...option}
      onChange={(_, { checked }) =>
        handleCheckboxChange({
          checked,
          filtersState,
          column,
          option,
          setFiltersState,
          applyFilters,
          type,
        })
      }
      checked={option.selected}
      disabled={option.disabled}
    />
  );

  const renderViewAllButtonText = () => {
    /** This should render the text "View all ([amount of checkboxes])" or "View less" */
    return showAllItems
      ? viewLessLabel
      : `${viewAllLabel} (${filtersState[column].value.length})`;
  };

  return (
    <FormGroup {...components.FormGroup}>
      {firstFiveItems.map(renderCheckbox)}
      {showAllItems && restOfTheItems.map(renderCheckbox)}
      <Button
        className={`${componentClass}__view-all-button`}
        kind="ghost"
        size="sm"
        onClick={() => setShowAllItems(!showAllItems)}
      >
        {renderViewAllButtonText()}
      </Button>
    </FormGroup>
  );
};

OverflowCheckboxes.propTypes = {
  applyFilters: PropTypes.func,
  column: PropTypes.string,
  components: PropTypes.object,
  filtersState: PropTypes.object,
  setFiltersState: PropTypes.func,
  type: PropTypes.string,
  viewAllLabel: PropTypes.string,
  viewLessLabel: PropTypes.string,
};

export default OverflowCheckboxes;
