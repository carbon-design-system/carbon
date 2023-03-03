/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SideNavFooter from '../SideNavFooter';

describe('SideNavFooter', () => {
  it('should support labeling a rendered <button> through assistiveText', () => {
    render(
      <SideNavFooter
        assistiveText="test"
        expanded={false}
        onToggle={jest.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('test');
  });

  it('should call `onToggle` when a user interacts with the toggle', () => {
    const onToggle = jest.fn();
    render(
      <SideNavFooter
        assistiveText="test"
        expanded={false}
        onToggle={onToggle}
      />
    );
    userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavFooter
        assistiveText="test"
        className="test"
        expanded={false}
        onToggle={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
