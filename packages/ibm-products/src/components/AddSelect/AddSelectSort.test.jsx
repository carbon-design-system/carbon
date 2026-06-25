//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import { AddSelectSort } from './AddSelectSort';
import { pkg, carbon } from '../../settings';

const blockClass = `${pkg.prefix}--add-select-sort`;
const componentName = AddSelectSort.name;

describe(componentName, () => {
  it('renders', async () => {
    render(<AddSelectSort sortByLabel="test sort title" />);
  });

  it('has no accessibility violations', async () => {
    render(<AddSelectSort />);
    const AddSelectElement = document.querySelector(`.${blockClass}`);
    await expect(AddSelectElement).toBeAccessible(componentName);
    await expect(AddSelectElement).toHaveNoAxeViolations();
  });

  it('renders with options', async () => {
    const props = {
      sortBy: ['title'],
      sortByLabel: 'test sort title',
    };
    render(<AddSelectSort {...props} />);
  });

  it('sorts on click', async () => {
    const attributeHandler = jest.fn();
    const directionHandler = jest.fn();
    const user = userEvent.setup();
    const props = {
      setSortAttribute: attributeHandler,
      setSortDirection: directionHandler,
      sortBy: ['title'],
      sortByLabel: 'test sort title',
    };
    render(<AddSelectSort {...props} />);
    const menu = document.querySelector(
      `.${blockClass}_overflow .${carbon.prefix}--overflow-menu`
    );
    await act(() => user.click(menu));
    const menuItem = document.querySelector(`.${blockClass}_overflow-item`);
    await act(() => user.click(menuItem));
    expect(attributeHandler).toHaveBeenCalled();
    expect(directionHandler).toHaveBeenCalled();
  });
});
