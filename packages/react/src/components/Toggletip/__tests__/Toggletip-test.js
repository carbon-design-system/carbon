/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const prefix = 'cds';
import React, { forwardRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '..';
import { Information } from '@carbon/react/icons';
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
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
      'right-start',
      'right-end',
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

    describe('autoAlign', () => {
      it('should render without errors when composed with ToggletipButton, ToggletipContent, ToggletipActions', async () => {
        render(
          <div>
            <Toggletip align="bottom" autoAlign defaultOpen>
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>Test content</p>
                <ToggletipActions>
                  <a href="#">Link</a>
                  <button>Button</button>
                </ToggletipActions>
              </ToggletipContent>
            </Toggletip>
          </div>
        );
      });
    });

    describe('ToggletipLabel', () => {
      it('should render with custom element using as prop', () => {
        const CustomElement = forwardRef((props, ref) => (
          <div data-testid="custom-label" ref={ref} {...props} />
        ));

        render(<Toggletip as={CustomElement}>Label</Toggletip>);
        expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      });
    });

    describe('ToggletipButton', () => {
      const CustomButton = forwardRef((props, ref) => (
        <div data-testid="custom-button" ref={ref} {...props} />
      ));

      it('should render custom component with onClick handler', async () => {
        const user = userEvent.setup();
        render(
          <Toggletip>
            <ToggletipButton as={CustomButton}>Click me</ToggletipButton>
          </Toggletip>
        );

        const button = screen.getByTestId('custom-button');
        expect(button).toBeInTheDocument();
        await user.click(button);
      });

      it('should use default label when not provided', () => {
        render(
          <Toggletip>
            <ToggletipButton>
              <span>Icon</span>
            </ToggletipButton>
          </Toggletip>
        );

        expect(screen.getByRole('button')).toHaveAttribute(
          'aria-label',
          'Show information'
        );
      });
    });

    describe('ToggletipContent', () => {
      it('should render with custom className', () => {
        render(
          <Toggletip defaultOpen>
            <ToggletipContent className="custom-content">
              Content
            </ToggletipContent>
          </Toggletip>
        );

        expect(screen.getByText('Content').parentElement).toHaveClass(
          'custom-content'
        );
      });

      it('should have correct aria attributes', async () => {
        render(
          <Toggletip>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>Content</ToggletipContent>
          </Toggletip>
        );

        expect(screen.getByText('Toggle')).toHaveAttribute(
          'aria-expanded',
          'false'
        );
        await userEvent.click(screen.getByText('Toggle'));
        expect(screen.getByText('Toggle')).toHaveAttribute(
          'aria-expanded',
          'true'
        );
      });
    });

    describe('ToggletipActions', () => {
      it('should render with custom className', () => {
        render(
          <ToggletipActions className="custom-actions">
            <button>Action</button>
          </ToggletipActions>
        );

        expect(screen.getByRole('button').parentElement).toHaveClass(
          'custom-actions'
        );
      });
    });

    describe('Toggletip Keyboard Navigation', () => {
      it('should handle Tab navigation correctly', async () => {
        render(
          <Toggletip defaultOpen>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>
              <button>Action 1</button>
              <button>Action 2</button>
            </ToggletipContent>
          </Toggletip>
        );

        const toggleButton = screen.getByText('Toggle');
        await userEvent.tab();
        expect(toggleButton).toHaveFocus();
      });

      it('should close on blur when focus moves outside', async () => {
        render(
          <>
            <button>Outside</button>
            <Toggletip defaultOpen>
              <ToggletipButton>Toggle</ToggletipButton>
              <ToggletipContent>Content</ToggletipContent>
            </Toggletip>
          </>
        );

        const outsideButton = screen.getByText('Outside');
        await userEvent.click(outsideButton);
        expect(screen.getByText('Toggle')).toHaveAttribute(
          'aria-expanded',
          'false'
        );
      });
    });

    describe('Toggletip Focus Management', () => {
      it('should return focus to trigger button when closing with Escape', async () => {
        render(
          <Toggletip defaultOpen>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>
              <button>Action</button>
            </ToggletipContent>
          </Toggletip>
        );

        const actionButton = screen.getByText('Action');
        actionButton.focus();
        await userEvent.keyboard('{Escape}');

        expect(screen.getByText('Toggle')).toHaveFocus();
      });
    });

    describe('Toggletip Alignment', () => {
      it.each([
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
      ])('should handle %s alignment correctly', (alignment) => {
        const { container } = render(
          <Toggletip align={alignment} defaultOpen>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>Content</ToggletipContent>
          </Toggletip>
        );

        expect(container.firstChild).toHaveClass(`cds--popover--${alignment}`);
      });
    });

    describe('Toggletip Closing Behavior', () => {
      it('should not close when clicking inside the toggletip during auto-alignment', async () => {
        render(
          <Toggletip autoAlign defaultOpen>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>
              <div data-testid="content">Content</div>
            </ToggletipContent>
          </Toggletip>
        );

        await userEvent.click(screen.getByTestId('content'));
        expect(screen.getByText('Toggle')).toHaveAttribute(
          'aria-expanded',
          'true'
        );
      });

      it('should close when focus moves outside the toggletip', async () => {
        const user = userEvent.setup();
        const { container } = render(
          <>
            <button data-testid="external-button">External</button>
            <Toggletip defaultOpen>
              <ToggletipButton>Toggle</ToggletipButton>
              <ToggletipContent>Content</ToggletipContent>
            </Toggletip>
          </>
        );

        const toggleButton = screen.getByText('Toggle');
        const externalButton = screen.getByTestId('external-button');

        await user.click(toggleButton);
        await user.tab();

        expect(container.lastChild).not.toHaveClass(
          `${prefix}--toggletip--open`
        );
        expect(container.lastChild).not.toHaveClass(`${prefix}--popover--open`);
      });

      it('should not close when open and relatedTarget is null', () => {
        const { container } = render(
          <Toggletip defaultOpen>
            <ToggletipButton>Toggle</ToggletipButton>
            <ToggletipContent>
              <button>Action</button>
            </ToggletipContent>
          </Toggletip>
        );

        expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
        const toggletipWrapper = container.firstChild;

        fireEvent.blur(toggletipWrapper, {
          currentTarget: toggletipWrapper,
          relatedTarget: null,
        });

        expect(container.firstChild).toHaveClass(`${prefix}--toggletip--open`);
        expect(container.firstChild).toHaveClass(`${prefix}--popover--open`);
        expect(screen.getByText('Toggle')).toHaveAttribute(
          'aria-expanded',
          'true'
        );
      });
    });
  });
});
