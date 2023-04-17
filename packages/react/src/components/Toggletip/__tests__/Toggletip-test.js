/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const prefix = 'cds';
import React, { forwardRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Toggletip, ToggletipButton } from '..';
import userEvent from '@testing-library/user-event';

describe('Toggletip', () => {
  describe('accessibility', () => {
    test.todo('accessibility-checker');
    it('should have no Axe violations', async () => {
      const { container } = render(
        <Toggletip data-testid="toggletip">test</Toggletip>
      );

      await expect(container).toHaveNoAxeViolations();
    });
  });

  // Usage
  it('should toggle visibility on click', async () => {
    const { container } = render(
      <Toggletip data-testid="toggletip">
        <ToggletipButton label="Show information">test</ToggletipButton>
      </Toggletip>
    );
    await userEvent.click(screen.getByText('test'));

    expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
    expect(container.firstChild).toHaveClass(`${prefix}--popover--open`);
  });

  it('should toggle visibility on Enter and Space', async () => {
    const { container } = render(
      <Toggletip data-testid="toggletip">
        <ToggletipButton label="Show information">test</ToggletipButton>
      </Toggletip>
    );
    await userEvent.type(screen.getByRole('button'), 'enter');
    expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
    expect(container.firstChild).toHaveClass(`${prefix}--popover--open`);

    await userEvent.type(screen.getByRole('button'), 'space');
    expect(container.firstChild).not.toHaveClass(`${prefix}--toggletip--open`);
    expect(container.firstChild).not.toHaveClass(`${prefix}--popover--open`);
  });
  it('should close on Escape', async () => {
    const { container } = render(
      <Toggletip data-testid="toggletip" defaultOpen>
        <ToggletipButton label="Show information">test</ToggletipButton>
      </Toggletip>
    );
    await userEvent.type(screen.getByRole('button'), 'space');
    expect(container.firstChild).not.toHaveClass(`${prefix}--toggletip--open`);
    expect(container.firstChild).not.toHaveClass(`${prefix}--popover--open`);
  });
  it('should close if an element outside of the toggletip is clicked', async () => {
    const { container } = render(
      <Toggletip data-testid="toggletip" defaultOpen>
        <ToggletipButton label="Show information">test</ToggletipButton>
      </Toggletip>
    );

    await userEvent.click(document.body);

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(container.firstChild).not.toHaveClass(`${prefix}--toggletip--open`);
    expect(container.firstChild).not.toHaveClass(`${prefix}--popover--open`);
  });

  describe('Component API', () => {
    it('should support custom elements with the `as` prop', () => {
      const CustomComponent = forwardRef((props, ref) => {
        return <div data-testid="custom-component" ref={ref} {...props} />;
      });

      render(<Toggletip as={CustomComponent}>test</Toggletip>);

      expect(screen.getByTestId('custom-component')).toBeInTheDocument();
    });

    it('should support a custom class name with the `className` prop', () => {
      const { container } = render(
        <Toggletip data-testid="toggletip" className="custom-class">
          <span>test</span>
        </Toggletip>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
    it.each([
      'left',
      'right',
      'top',
      'bottom',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'left-top',
      'left-top',
      'right-top',
      'right-bottom',
    ])('should support different alignments with the `align` prop', (align) => {
      const { container } = render(
        <Toggletip data-testid="toggletip" align={align}>
          <span>test</span>
        </Toggletip>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--popover--${align}`);
    });
    it('should initially be open if `defaultOpen` is set to true', () => {
      const { container } = render(
        <Toggletip data-testid="toggletip" defaultOpen>
          <span>test</span>
        </Toggletip>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
      expect(container.firstChild).toHaveClass(`${prefix}--popover--open`);
    });

    it('should close when the browser window loses focus', () => {
      const { container } = render(
        <Toggletip data-testid="toggletip" defaultOpen>
          <span>test</span>
        </Toggletip>
      );

      fireEvent.blur(window);

      expect(container.firstChild).not.toHaveClass(
        `${prefix}--toggletip--open`
      );
      expect(container.firstChild).not.toHaveClass(`${prefix}--popover--open`);
    });

    it.todo(
      'should return to the trigger button if the menu is closed while focus is still inside the menu'
    );

    it('should not close when the menu itself is clicked', async () => {
      const { container } = render(
        <Toggletip data-testid="toggletip" defaultOpen>
          <div data-testid="innerDiv">test</div>
        </Toggletip>
      );

      await userEvent.click(screen.queryByTestId('innerDiv'));

      expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
      expect(container.firstChild).toHaveClass(`${prefix}--popover--open`);
    });

    it('should be closed when the focus leaves the tooltip', async () => {
      const { container } = render(
        <Toggletip data-testid="toggletip" defaultOpen>
          <span>test</span>
        </Toggletip>
      );

      fireEvent.blur(window);

      expect(container.firstChild).not.toHaveClass(
        `${prefix}--toggletip--open`
      );
      expect(container.firstChild).not.toHaveClass(`${prefix}--popover--open`);
    });
  });
});
