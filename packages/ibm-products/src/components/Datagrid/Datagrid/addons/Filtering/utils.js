/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CHECKBOX,
  DATE,
  DROPDOWN,
  FLYOUT,
  MULTISELECT,
  NUMBER,
  PANEL,
  RADIO,
} from './constants';

const applyInitialFilters = (filterState, initialFilters) => {
  Object.keys(filterState).forEach((key) => {
    const hasInitialFilter = initialFilters.find((filter) => filter.id === key);

    if (hasInitialFilter) {
      filterState[key].value = hasInitialFilter.value;
    }
  });
};

// This functions takes the filters passed in and makes an object to track it's state
export const getInitialStateFromFilters = (
  filters,
  variation,
  initialFilters
) => {
  const initialFilterState = {};

  const setInitialState = ({ type, column, props }) => {
    if (type === CHECKBOX) {
      initialFilterState[column] = {
        value: props.Checkbox.map(({ id, labelText, value, ...rest }) => ({
          id,
          labelText,
          value,
          selected: false,
          ...rest,
        })),
        type,
      };
    } else if (type === DATE) {
      initialFilterState[column] = {
        value: [null, null],
        type,
      };
    } else if (type === NUMBER) {
      initialFilterState[column] = {
        value: '',
        type,
      };
    } else if (type === RADIO) {
      initialFilterState[column] = {
        value: '',
        type,
      };
    } else if (type === DROPDOWN) {
      initialFilterState[column] = {
        value: '',
        type,
      };
    } else if (type === MULTISELECT) {
      initialFilterState[column] = {
        value: props.MultiSelect.items.map((item) => ({
          id: typeof item === 'string' ? item : item.id,
          value: typeof item === 'string' ? item : item.text,
          selected: false,
        })),
        type,
      };
    }
  };

  if (variation === FLYOUT) {
    filters.forEach(setInitialState);
  } else if (variation === PANEL) {
    filters.forEach(({ filters: sections = [] }) => {
      sections.forEach(({ filter }) => setInitialState(filter));
    });
  }

  if (initialFilters.length > 0) {
    applyInitialFilters(initialFilterState, initialFilters);
  }

  return initialFilterState;
};
