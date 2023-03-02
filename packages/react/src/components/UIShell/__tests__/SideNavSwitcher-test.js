/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SideNavSwitcher from '../SideNavSwitcher';

describe('SideNavSwitcher', () => {
  it('should label the <select> through `labelText`', () => {
    render(
      <SideNavSwitcher
        labelText="test"
        options={['Option 1', 'Option 2', 'Option 3']}
      />
    );
    expect(screen.getByRole('combobox')).toEqual(screen.getByLabelText('test'));
  });

  it('should call `onChange` when the value of the <select> changes', () => {
    const onChange = jest.fn();
    render(
      <SideNavSwitcher
        labelText="test"
        options={['Option 1', 'Option 2', 'Option 3']}
        onChange={onChange}
      />
    );

    userEvent.selectOptions(
      screen.getByLabelText('test'),
      screen.getByRole('option', { name: 'Option 1' })
    );

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Option 1',
        }),
      })
    );
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavSwitcher
        className="test"
        labelText="test"
        options={['Option 1', 'Option 2', 'Option 3']}
      />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should support a `ref` on the <select> element', () => {
    const ref = jest.fn();
    render(
      <SideNavSwitcher
        ref={ref}
        labelText="test"
        options={['Option 1', 'Option 2', 'Option 3']}
      />
    );

    expect(ref).toHaveBeenCalledWith(screen.getByLabelText('test'));
  });
});
