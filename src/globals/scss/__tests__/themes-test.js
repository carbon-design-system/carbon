/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { types } = require('node-sass');
const { renderSass } = require('../../../../tools/jest/scss');

const classic = [
  'brand-01',
  'brand-02',
  'brand-03',

  'inverse-01',
  'inverse-02',

  'ui-01',
  'ui-02',
  'ui-03',
  'ui-04',
  'ui-05',

  'text-01',
  'text-02',
  'text-03',

  'field-01',
  'field-02',

  'support-01',
  'support-02',
  'support-03',
  'support-04',

  'nav-01',
  'nav-02',
  'nav-03',
  'nav-04',
  'nav-05',
  'nav-06',
  'nav-07',
  'nav-08',

  'hover-primary',
  'hover-primary-text',
  'hover-danger',
  'hover-secondary',
  'hover-row',

  // Global
  'input-border',
  'input-label-weight',
  'focus',

  // Button
  'button-font-weight',
  'button-font-size',
  'button-border-radius',
  'button-height',
  'button-padding',
  'button-padding-sm',
  'button-border-width',
  'button-outline-width',

  // Accordion (Reverse)
  'accordion-flex-direction',
  'accordion-justify-content',
  'accordion-arrow-margin',
  'accordion-title-margin',
  'accordion-content-padding',

  // Card
  'card-text-align',
  'card-flex-align',

  // Checkbox
  'checkbox-border-width',

  // Code Snippet
  'snippet-background-color',
  'snippet-border-color',

  // Content Switcher
  'content-switcher-border-radius',
  'content-switcher-option-border',

  // Data Table
  'data-table-heading-transform',
  'data-table-heading-border-bottom',
  'data-table-row-height',

  // Modal
  'modal-border-top',
  'modal-footer-background-color',

  // Progress Indicator
  'progress-indicator-bar-width',
  'progress-indicator-stroke-width',
  'progress-indicator-line-offset',

  // Radio Button
  'radio-border-width',

  // Structured Theme Variables
  'structured-list-padding',
  'structured-list-text-transform',

  // Skeleton Loading
  'skeleton',
];

describe('_theme.scss', () => {
  it.each(classic)('$%s should be exported', async name => {
    const { calls } = await renderSass(`
@import './src/globals/scss/theme';

$c: test(global-variable-exists(${name}));
`);
    // Check that global-variable-exists returned true
    expect(calls[0][0].getValue()).toBe(true);
  });
});
