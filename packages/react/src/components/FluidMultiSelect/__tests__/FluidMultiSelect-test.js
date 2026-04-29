/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FluidMultiSelect from '../FluidMultiSelect';
import userEvent from '@testing-library/user-event';

const waitForPosition = () => act(async () => {});

describe('FluidMultiSelect', () => {
  it('should render with fluid classes', async () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <FluidMultiSelect id="test" label="Field" items={items} />
    );
    expect(container.firstChild).toHaveClass(`cds--list-box__wrapper--fluid`);
  });
});

it('should pass onInputValueChange when isFilterable is enabled', async () => {
  const items = generateItems(4, generateGenericItem);
  const onInputValueChange = jest.fn();

  render(
    <FluidMultiSelect
      id="test"
      isFilterable
      label="Field"
      items={items}
      onInputValueChange={onInputValueChange}
    />
  );

  await waitForPosition();
  await userEvent.click(screen.getByRole('combobox'));
  await userEvent.type(screen.getByRole('combobox'), 'test');

  expect(onInputValueChange).toHaveBeenCalledTimes(4);
  expect(onInputValueChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ inputValue: 'test' })
  );
});
