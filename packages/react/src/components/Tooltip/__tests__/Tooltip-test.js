/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tooltip } from '../';
import userEvent from '@testing-library/user-event';

describe('Tooltip', () => {
  it('should support a custom className with the `className` prop', () => {
    const { container } = render(
      <Tooltip className="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(
      <Tooltip data-testid="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support initially showing the tooltip with `defaultOpen`', () => {
    const { container } = render(
      <Tooltip defaultOpen label="Close">
        <button type="button">X</button>
      </Tooltip>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const popoverContainer = container.querySelector('.cds--popover-container');
    expect(popoverContainer).toHaveClass('cds--popover--open');
  });

  it('should support labeling an element by its tooltip', () => {
    render(
      <Tooltip label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByText('X')).toHaveAttribute('aria-labelledby');
  });

  it('should support describing an element by its tooltip', () => {
    render(
      <Tooltip description="test description">
        <button type="button">test</button>
      </Tooltip>
    );
    expect(screen.getByText('test')).toHaveAttribute('aria-describedby');
  });

  it('should call onFocus', async () => {
    const onFocus = jest.fn();
    render(
      <Tooltip description="test description">
        <button type="button" onFocus={onFocus}>
          test
        </button>
      </Tooltip>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur', async () => {
    const onBlur = jest.fn();
    render(
      <Tooltip description="test description">
        <button type="button" onBlur={onBlur}>
          test
        </button>
      </Tooltip>
    );

    await userEvent.click(screen.getByRole('button'));
    await userEvent.tab();

    expect(onBlur).toHaveBeenCalled();
  });

  it('should close when item is activated and `closeOnActivation`', async () => {
    const { container } = render(
      <>
        <Tooltip closeOnActivation label="Close">
          <button type="button">X</button>
        </Tooltip>
        <div>Hey</div>
      </>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const popoverContainer = container.querySelector('.cds--popover-container');
    const button = screen.getByRole('button');

    await userEvent.tab();

    expect(popoverContainer).toHaveClass('cds--popover--open');
    await userEvent.click(button);
    expect(popoverContainer).not.toHaveClass('cds--popover--open');
  });
});

describe('Tooltip ARIA logic', () => {
  it('should not use aria-labelledby when the button already has aria-label', () => {
    render(
      <Tooltip defaultOpen label="Label text">
        <button aria-label="Aria Label">X</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-labelledby');
    expect(button).toHaveAttribute('aria-label', 'Aria Label');
  });

  it('should keep the button’s aria-labelledby if it already has one', () => {
    render(
      <Tooltip defaultOpen label="Label text">
        <button aria-labelledby="custom-id">X</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-labelledby', 'custom-id');
  });

  it('should apply tooltip ID to aria-labelledby if label is given and the button doesn’t have its own', () => {
    render(
      <Tooltip defaultOpen label="Label text">
        <button>X</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    const tooltip = screen.getByRole('tooltip');
    expect(button).toHaveAttribute('aria-labelledby', tooltip.id);
  });

  it('should keep aria-describedby from the button if aria-label is also set', () => {
    render(
      <Tooltip defaultOpen description="Some description">
        <button aria-label="Label" aria-describedby="desc-id">
          X
        </button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'desc-id');
  });

  it('should use its own ID for aria-describedby if only description is given', () => {
    render(
      <Tooltip defaultOpen description="Some description">
        <button>X</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    const tooltip = screen.getByRole('tooltip');
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
  });
});
