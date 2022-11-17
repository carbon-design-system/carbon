/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * A selector selecting tabbable nodes.
 * Borrowed from `carbon-angular`. tabbable === focusable.
 */
const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true],
  ${prefix}-accordion-item,
  ${prefix}-btn,
  ${prefix}-breadcrumb-link,
  ${prefix}-checkbox,
  ${prefix}-code-snippet,
  ${prefix}-combo-box,
  ${prefix}-content-switcher-item,
  ${prefix}-copy-button,
  ${prefix}-table-header-row,
  ${prefix}-table-row,
  ${prefix}-table-toolbar-search,
  ${prefix}-date-picker-input,
  ${prefix}-dropdown,
  ${prefix}-input,
  ${prefix}-link,
  ${prefix}-number-input,
  ${prefix}-modal,
  ${prefix}-modal-close-button,
  ${prefix}-multi-select,
  ${prefix}-inline-notification,
  ${prefix}-toast-notification,
  ${prefix}-overflow-menu,
  ${prefix}-overflow-menu-item,
  ${prefix}-page-sizes-select,
  ${prefix}-pages-select,
  ${prefix}-progress-step,
  ${prefix}-radio-button,
  ${prefix}-search,
  ${prefix}-slider,
  ${prefix}-slider-input,
  ${prefix}-structured-list,
  ${prefix}-tab,
  ${prefix}-filter-tag,
  ${prefix}-textarea,
  ${prefix}-clickable-tile,
  ${prefix}-expandable-tile,
  ${prefix}-radio-tile,
  ${prefix}-selectable-tile,
  ${prefix}-toggle,
  ${prefix}-tooltip,
  ${prefix}-tooltip-definition,
  ${prefix}-tooltip-icon,
  ${prefix}-header-menu,
  ${prefix}-header-menu-button,
  ${prefix}-header-menu-item,
  ${prefix}-header-name,
  ${prefix}-header-nav-item,
  ${prefix}-side-nav-link,
  ${prefix}-side-nav-menu,
  ${prefix}-side-nav-menu-item
`;

// Because we're going to have a bunch of exports
export { selectorTabbable };
