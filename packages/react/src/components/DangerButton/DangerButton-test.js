/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DangerButton from '../DangerButton';
import { Search } from '@carbon/icons-react';

describe('DangerButton', () => {
  it('should render children as expected', () => {
    render(
      <DangerButton>
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    const childrenArray = screen.getAllByText('Test');
    expect(childrenArray.length).toEqual(2);
  });

  it('should add extra classes passed via className prop', () => {
    render(
      <DangerButton className="extra-class" data-testid="danger-btn-1">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    expect(screen.getByTestId('danger-btn-1')).toHaveClass('extra-class');
  });

  it('should be kind danger', () => {
    render(
      <DangerButton data-testid="danger-btn-2">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    expect(screen.getByTestId('danger-btn-2')).toHaveClass('cds--btn--danger');
  });

  it('should render an icon if an icon is passed in via prop', () => {
    render(
      <DangerButton
        renderIcon={() => {
          return <Search title="search-icon" />;
        }}
        iconDescription="search">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    const icon = screen.getByTitle('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', async () => {
    const onClick = jest.fn();

    render(
      <DangerButton data-testid="danger-btn-3" onClick={onClick}>
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    const button = screen.getByTestId('danger-btn-3');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
