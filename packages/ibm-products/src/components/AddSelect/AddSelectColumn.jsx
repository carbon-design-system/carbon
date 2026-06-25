//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Search,
  Tag,
  Checkbox,
  usePrefix,
  unstable_FeatureFlags as FeatureFlags,
  Popover,
  PopoverContent,
  IconButton,
} from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import { pkg } from '../../settings';
import { AddSelectList } from './AddSelectList';
import { AddSelectSort } from './AddSelectSort';
import { sortItems } from './add-select-utils';
import { useItemSort } from './hooks/useItemSort';
import { useId } from '../../global/js/utils/useId';
import useParentSelect from './hooks/useParentSelect';

const blockClass = `${pkg.prefix}--add-select`;
const colClass = `${blockClass}__column`;
const componentName = 'AddSelectColumn';

export let AddSelectColumn = ({
  columnInputPlaceholder,
  filterByLabel,
  header,
  items,
  multiSelection,
  parentId,
  path,
  setMultiSelection,
  setPath,
  sortByLabel,
  ...props
}) => {
  const { parentSelected, setParentSelected } = useParentSelect();
  const selectAllId = useId();
  const filterId = useId();
  const searchId = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const { sortDirection, setSortDirection, sortAttribute, setSortAttribute } =
    useItemSort();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const { entries, filterBy, sortBy } = items;
  const getSelectedItem = () => {
    const parentInPath = path.find((entry) => entry.parentId === parentId);
    /**
     * this check helps ensure that when the state of the open columns is cleared by global search
     * that the columns are rebuilt from the data in the path array
     */
    if (parentInPath && !parentSelected) {
      return entries.find((item) => item.id === parentInPath.id);
    }
    return entries.find((item) => item.id === parentSelected) ?? null;
  };

  const selectedItem = getSelectedItem();
  /**
   * this check helps prevent children from already being open when you switch from parents
   * on the same level. for example- using the storybook example, if you click on folder 1,
   * file 1, folder 2, and then folder 1 again file 1 children shouldn't be expanded. this
   * check ensures that when a user navigates to parents on the same level that the open state
   * of their children is cleared by referencing the path array.
   */
  const itemInPath =
    selectedItem && path.find((entry) => entry.id === selectedItem.id);

  const allSelected = entries.every((item) => multiSelection.includes(item.id));

  // filtering
  const filterByOpts = filterBy ? entries.map((item) => item[filterBy]) : [];

  const selectAllHandler = (event, { checked }) => {
    const itemIds = entries.map((item) => item.id);
    if (checked) {
      const newSelections = [...new Set([...multiSelection, ...itemIds])];
      setMultiSelection(newSelections);
    } else {
      const newItems = multiSelection.filter((i) => !itemIds.includes(i));
      setMultiSelection(newItems);
    }
  };

  const filterHandler = (checked, opt) => {
    if (checked) {
      const newFilters = [...filters, opt];
      setFilters(newFilters);
    } else {
      const newFilters = filters.filter((o) => o !== opt);
      setFilters(newFilters);
    }
  };

  // filter and sort array functions
  const filterBySearch = (item) =>
    item.title.toLowerCase().includes(searchTerm);

  const filterByAttribute = (item) => {
    if (filters.length === 0) {
      return true;
    }
    const { filterBy } = item;
    const filterByValue = item[filterBy];
    return filters.some((filter) => filter === filterByValue);
  };

  const filterBtnId = `filter-${filterId}`;

  const sortFn = sortItems(sortAttribute, sortDirection);

  const colItems = entries
    .filter(filterBySearch) // first check if the item meets the search
    .filter(filterByAttribute) // then check if the item is included in the filter
    .sort(sortFn); // then sort the items by whatever criteria

  const parentSelectionHandler = (id, title) => {
    setParentSelected(id);
    setPath(id, title, parentId);
  };

  return (
    <>
      <div className={colClass}>
        <div className={`${colClass}-search-bar`}>
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={columnInputPlaceholder}
            className={`${colClass}-input`}
            id={searchId}
            labelText={columnInputPlaceholder}
            size="md"
          />
          <div className={`${colClass}-sort-filter`}>
            <AddSelectSort
              items={entries}
              setSortAttribute={setSortAttribute}
              setSortDirection={setSortDirection}
              sortAttribute={sortAttribute}
              sortDirection={sortDirection}
              sortBy={sortBy}
              sortByLabel={sortByLabel}
            />
            {filterByOpts.length > 0 && (
              <FeatureFlags enableV12DynamicFloatingStyles>
                <Popover
                  align="bottom-right"
                  isTabTip
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setFilterOpen(false);
                      e.preventDefault(); // prevent modal close
                      e.stopPropagation();
                      const filterBtn = document.querySelector(
                        `#${filterBtnId}`
                      );
                      filterBtn?.focus(); // workaround to return focus, refs not possible on button inside popover for some reason
                    }
                  }}
                  onRequestClose={() => setFilterOpen(false)}
                  open={filterOpen}
                >
                  <IconButton
                    size="md"
                    id={filterBtnId}
                    hasIconOnly
                    aria-expanded={filterOpen}
                    badgeCount={filters.length > 0 ? 0 : undefined} // setting to 0 renders an empty dot
                    kind="ghost"
                    label={filterByLabel || 'Filter'}
                    onClick={() => {
                      setFilterOpen((prev) => !prev);
                    }}
                  >
                    <Filter />
                  </IconButton>
                  <PopoverContent className={`${colClass}-filter-popover`}>
                    {filterByOpts.map((opt) => (
                      <Checkbox
                        key={opt}
                        id={opt}
                        labelText={opt}
                        onChange={(event, { checked }) =>
                          filterHandler(checked, opt)
                        }
                        checked={filters.find((o) => o === opt) ? true : false}
                      />
                    ))}
                  </PopoverContent>
                </Popover>
              </FeatureFlags>
            )}
          </div>
        </div>
        <div className={`${blockClass}__tags`}>
          <Checkbox
            id={`${selectAllId}-select-all`}
            className={`${colClass}__select-all`}
            checked={allSelected}
            onChange={selectAllHandler}
            labelText={
              <>
                <span className={`${blockClass}__tag-label`}>{header}</span>
                <Tag type="gray" size="sm">
                  {colItems.length}
                </Tag>
              </>
            }
          />
        </div>
        <AddSelectList
          {...props}
          filteredItems={colItems}
          setMultiSelection={setMultiSelection}
          multiSelection={multiSelection}
          setParentSelected={parentSelectionHandler}
          parentSelected={parentSelected}
        />
      </div>
      {selectedItem && itemInPath && (
        <AddSelectColumn
          columnInputPlaceholder={columnInputPlaceholder}
          header={selectedItem.title}
          items={selectedItem.children}
          multiSelection={multiSelection}
          setMultiSelection={setMultiSelection}
          parentId={selectedItem.id}
          setPath={setPath}
          path={path}
          sortByLabel={sortByLabel}
          filterByLabel={filterByLabel}
          {...props}
        />
      )}
    </>
  );
};

AddSelectColumn.propTypes = {
  columnInputPlaceholder: PropTypes.string,
  filterByLabel: PropTypes.string,
  header: PropTypes.string,
  items: PropTypes.object,
  multiSelection: PropTypes.array,
  parentId: PropTypes.string,
  path: PropTypes.array,
  setMultiSelection: PropTypes.func,
  setPath: PropTypes.func,
  sortByLabel: PropTypes.string,
};

AddSelectColumn.displayName = componentName;
