/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SideNavHeader from '../SideNavHeader';

describe('SideNavHeader', () => {
  it('should render a <header> element', () => {
    const { container } = render(<SideNavHeader renderIcon={() => <svg />} />);
    expect(container.firstChild.tagName).toBe('HEADER');
  });

  it('should support a custom icon through `renderIcon`', () => {
    const CustomIcon = jest.fn(() => <svg data-testid="test" />);
    render(<SideNavHeader renderIcon={CustomIcon} />);
    expect(CustomIcon).toHaveBeenCalled();
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavHeader className="test" renderIcon={() => <svg />} />
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
