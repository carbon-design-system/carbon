/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** Constants for update methods can either be batch or instant */
export const BATCH = 'batch';
export const INSTANT = 'instant';

/** Constants for filter variation */
export const FLYOUT = 'flyout';
export const PANEL = 'panel';

/** Constants for filter type */
export const DATE = 'date';
export const NUMBER = 'number';
export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';
export const DROPDOWN = 'dropdown';
export const MULTISELECT = 'multiSelect';

/** Constants for event emitters */
export const CLEAR_FILTERS = 'clearFilters';
export const CLEAR_SINGLE_FILTER = 'clearSingleFilter';

/** Constants for panel dimensions */
export const PANEL_WIDTH = 320;
export const ACTION_SET_HEIGHT = 64;

/** Constants for local reducer */
export const SAVED_FILTERS = 'savedFilters';
