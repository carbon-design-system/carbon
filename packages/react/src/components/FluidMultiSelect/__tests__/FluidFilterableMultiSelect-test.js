/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FluidFilterableMultiSelect from '../FluidFilterableMultiSelect';

describe('FluidFilterableMultiSelect', () => {
  it('should render with fluid classes', () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <FluidFilterableMultiSelect
        id="test"
        label="Field"
        items={items}
        className="test"
      />
    );

    expect(container.firstChild).toHaveClass(
      'cds--multi-select__wrapper',
      'cds--multi-select--filterable__wrapper',
      'cds--list-box__wrapper',
      'cds--list-box__wrapper--fluid',
      'test',
      { exact: true }
    );
  });

  it('should render condensed fluid classes when `isCondensed` is `true`', () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <FluidFilterableMultiSelect
        id="test"
        label="Field"
        items={items}
        isCondensed
      />
    );

    expect(container.firstChild).toHaveClass(
      'cds--multi-select__wrapper',
      'cds--multi-select--filterable__wrapper',
      'cds--list-box__wrapper',
      'cds--list-box__wrapper--fluid',
      'cds--list-box__wrapper--fluid--condensed',
      { exact: true }
    );
  });
});
