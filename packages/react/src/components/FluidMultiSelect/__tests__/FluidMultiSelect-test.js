/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FluidMultiSelect from '../FluidMultiSelect';

describe('FluidMultiSelect', () => {
  it('should render with fluid classes', async () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <FluidMultiSelect id="test" label="Field" items={items} />
    );
    expect(container.firstChild).toHaveClass(`cds--list-box__wrapper--fluid`);
  });
});
