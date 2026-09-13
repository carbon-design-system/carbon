/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');

const popoverScss = fs.readFileSync(
  path.join(__dirname, '../popover/_popover.scss'),
  'utf8'
);

describe('scss/components/popover', () => {
  test('manual start and end alignments anchor to trigger edges', () => {
    expect(popoverScss).toContain(
      '.#{$prefix}--popover--bottom-start:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain('inset-inline-start: 0;');
    expect(popoverScss).toContain(
      'transform: translateY(calc(100% + $popover-offset));'
    );

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--bottom-end:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain('inset-inline-end: 0;');

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--top-start:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain(
      'transform: translateY(calc(-100% - $popover-offset));'
    );

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--right-start:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain('inset-block-start: 0;');
    expect(popoverScss).toContain('transform: translateX($popover-offset);');

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--right-end:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain('inset-block-end: 0;');

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--left-start:not(.#{$prefix}--popover--auto-align)'
    );
    expect(popoverScss).toContain(
      'transform: translateX(calc(-1 * $popover-offset));'
    );

    expect(popoverScss).toContain(
      '.#{$prefix}--popover--left-end:not(.#{$prefix}--popover--auto-align)'
    );
  });
});
