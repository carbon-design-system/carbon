/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  DATE,
  DROPDOWN,
  NUMBER,
  RADIO,
  CHECKBOX,
  CLEAR_SINGLE_FILTER,
  SAVED_FILTERS,
  MULTISELECT,
} from './constants';
import { Filter } from '../../../../FilterSummary/FilterSummary';

type ActionType = typeof SAVED_FILTERS;

interface Action {
  type: ActionType;
  payload?: any;
}

export interface ContextType {
  EventEmitter: any;
  dispatch: React.Dispatch<Action>;
  state: {
    savedFilters: object[];
  };
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  panelOpen: boolean;
  tableId: string;
  filterTags: Filter[];
}

export const FilterContext = createContext<ContextType>({} as ContextType);

const EventEmitter = {
  events: {},
  dispatch: function (event, data) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((callback) => callback(data));
  },
  subscribe: function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    } else {
      this.events[event].push(callback);
    }
  },
};

const removeFilterItem = (state, index) => state.splice(index, 1);

const updateFilterState = (state, type, value) => {
  if (type === CHECKBOX || type === MULTISELECT) {
    return;
  }
  if (type === DATE) {
    const filterTagIndex = state.findIndex(
      (val) =>
        formatDateRange(val.value[0], val.value[1]) ===
        formatDateRange(value[0], value[1])
    );
    return removeFilterItem(state, filterTagIndex);
  }
  const filterTagIndex = state.findIndex((val) => val.value === value);
  return removeFilterItem(state, filterTagIndex);
};

export const clearSingleFilter = (
  { key, value, tableId },
  setAllFilters,
  state,
  contextTableId
) => {
  if (tableId !== contextTableId) {
    return;
  }
  const tempState = [...state.filters];
  tempState.forEach((f, filterIndex) => {
    if (f.id === key) {
      const filterValues = f.value;
      const filterType = f.type;
      updateFilterState(tempState, filterType, value);
      if (filterType === CHECKBOX || filterType === MULTISELECT) {
        /**
          When all checkboxes of a group are all unselected the value still exists in the filtersObjectArray
          This checks if all the checkboxes are selected = false and removes it from the array
        */
        const valueIndex = filterValues.findIndex((val) => val.value === value);
        filterValues[valueIndex].selected = false;
        const updatedFilterObject = {
          ...f,
          value: [...filterValues],
        };
        tempState[filterIndex] = updatedFilterObject;
        const index = tempState.findIndex((filter) => filter.id === key);

        // If all the selected state is false remove from array
        const shouldRemoveFromArray = tempState[index].value.every(
          (val) => val.selected === false
        );

        if (shouldRemoveFromArray) {
          removeFilterItem(tempState, index);
        }
      }
    }
  });
  setAllFilters(tempState);
};

const handleSingleFilterRemoval = (key, value, tableId) => {
  EventEmitter.dispatch(CLEAR_SINGLE_FILTER, { key, value, tableId });
};

const formatDateRange = (startDate, endDate) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  return `${startDateObj.toLocaleDateString()} - ${endDateObj.toLocaleDateString()}`;
};

const prepareFiltersForTags = (filters, renderDateLabel, tableId) => {
  const tags: Filter[] = [];

  filters.forEach(({ id, type, value }) => {
    const sharedFilterProps = {
      filter: true,
      onClose: () => handleSingleFilterRemoval(id, value, tableId),
    };

    if (type === DROPDOWN || type === RADIO || type === NUMBER) {
      tags.push({
        key: id,
        value,
        ...sharedFilterProps,
      });
    } else if (type === DATE) {
      const [startDate, endDate] = value;
      tags.push({
        key: id,
        value:
          renderDateLabel?.(startDate, endDate) ??
          formatDateRange(startDate, endDate),
        ...sharedFilterProps,
      });
    } else if (type === CHECKBOX || type === MULTISELECT) {
      value.forEach((option) => {
        if (option.selected) {
          tags.push({
            key: id,
            value: option.value,
            ...sharedFilterProps,
            onClose: () => handleSingleFilterRemoval(id, option.value, tableId),
          });
        }
      });
    }
  });
  return tags;
};

const filteringReducer = (state, action) => {
  switch (action.type) {
    case SAVED_FILTERS: {
      const { savedFilters } = action.payload || {};
      return {
        ...state,
        savedFilters,
      };
    }
    default:
      return state;
  }
};

export const FilterProvider = ({ children, filters, filterProps, tableId }) => {
  const { renderDateLabel } = filterProps || {};
  const filterTags = prepareFiltersForTags(filters, renderDateLabel, tableId);
  const [panelOpen, setPanelOpen] = useState(false);

  const initialState = {
    savedFilters: [],
  };
  const [state, dispatch] = useReducer(filteringReducer, initialState);

  const value = {
    filterTags,
    EventEmitter,
    panelOpen,
    setPanelOpen,
    state,
    dispatch,
    tableId,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  filterProps: PropTypes.object,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableId: PropTypes.string,
};
