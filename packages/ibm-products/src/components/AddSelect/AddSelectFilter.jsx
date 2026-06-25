//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState } from 'react';
import {
  Button,
  ButtonSet,
  Dropdown,
  Search,
  DismissibleTag,
  Layer,
} from '@carbon/react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Filter } from '@carbon/react/icons';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--add-select__global-filter`;
const componentName = 'AddSelectFilter';

export let AddSelectFilter = ({
  appliedFilters,
  clearFiltersText,
  filterOpts,
  filtersLabel,
  handleFilter,
  handleSearch,
  hasFiltersApplied,
  iconDescription,
  inputLabel,
  inputPlaceholder,
  multi,
  placeholder,
  primaryButtonText,
  searchTerm,
  secondaryButtonText,
}) => {
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

  const searchHandler = (e) => {
    handleSearch(e.target.value);
  };

  const onchangeHandler = ({ selectedItem }, id) => {
    setFilters({
      ...filters,
      [id]: selectedItem,
    });
  };

  /**
   * this component needs to manage it's own internal state of filters before they're applied
   * setFilters manages the local filter state
   * applyFilters adds the filter state to the parent
   * resetFilters resets the local state
   * clearFilters resets both
   */
  const applyFilters = () => {
    setOpen(false);
    handleFilter(filters);
  };

  const resetFilters = () => {
    setFilters({});
  };

  const clearFilters = () => {
    resetFilters();
    handleFilter({});
  };

  const removeTag = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    handleFilter(newFilters);
  };

  const getSelectedItem = (id) => {
    return filters[id] || '';
  };

  const showFilter = multi && filterOpts?.length > 0;
  const filterBtnClassnames = cx(`${blockClass}-toggle`, {
    [`${blockClass}-toggle--open`]: open,
  });
  const dirtyInput = Object.keys(filters).length > 0;

  return (
    <>
      <div className={`${blockClass}-search`}>
        <Search
          id="add-select-global-search-filter"
          labelText={inputLabel}
          placeholder={inputPlaceholder}
          value={searchTerm}
          onChange={searchHandler}
        />
        {showFilter && (
          <Button
            renderIcon={(props) => <Filter size={16} {...props} />}
            hasIconOnly
            kind="ghost"
            onClick={() => setOpen(!open)}
            iconDescription={iconDescription}
            className={filterBtnClassnames}
            size="md"
            tooltipPosition="left"
          />
        )}
        {open && (
          <Layer className={blockClass} level={1}>
            <div className={`${blockClass}-content`}>
              <p>{filtersLabel}</p>
              <div className={`${blockClass}-opts`}>
                {filterOpts.map((filterOpts) => (
                  <Dropdown
                    key={filterOpts.id}
                    id={filterOpts.id}
                    titleText={filterOpts.label}
                    items={filterOpts.opts}
                    onChange={(value) => onchangeHandler(value, filterOpts.id)}
                    selectedItem={getSelectedItem(filterOpts.id)}
                    label={placeholder}
                  />
                ))}
              </div>
            </div>
            <ButtonSet className={`${blockClass}-button-set`}>
              <Button
                kind="secondary"
                onClick={resetFilters}
                className={`${blockClass}-button`}
                disabled={!dirtyInput}
              >
                {secondaryButtonText}
              </Button>
              <Button
                kind="primary"
                onClick={applyFilters}
                className={`${blockClass}-button`}
                disabled={!dirtyInput && !hasFiltersApplied}
              >
                {primaryButtonText}
              </Button>
            </ButtonSet>
          </Layer>
        )}
      </div>
      {hasFiltersApplied && (
        <div className={`${blockClass}-applied`}>
          {Object.keys(appliedFilters).map((filterType) => (
            <DismissibleTag
              key={filterType}
              text={`${filterType}: ${appliedFilters[filterType]}`}
              type="gray"
              size="sm"
              onClose={() => removeTag(filterType)}
            />
          ))}
          <Button kind="ghost" size="sm" onClick={clearFilters}>
            {clearFiltersText}
          </Button>
        </div>
      )}
    </>
  );
};

AddSelectFilter.propTypes = {
  appliedFilters: PropTypes.object,
  clearFiltersText: PropTypes.string,
  filterOpts: PropTypes.array,
  filtersLabel: PropTypes.string,
  handleFilter: PropTypes.func,
  handleSearch: PropTypes.func,
  hasFiltersApplied: PropTypes.bool,
  iconDescription: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  primaryButtonText: PropTypes.string,
  searchTerm: PropTypes.string,
  secondaryButtonText: PropTypes.string,
};

AddSelectFilter.displayName = componentName;
