/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search, Add } from '@carbon/icons-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../../Button';

describe('Button', () => {
  it('should support rendering elements within the button through the `children` prop', () => {
    render(
      <Button>
        <span>child</span>
      </Button>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('should support a custom tabIndex through props', () => {
    render(<Button tabIndex={-1}>test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(
      <Button className="custom-class">test</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render an element with the button role', () => {
    render(<Button>test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should use the disabled prop to set disabled on the <button>', () => {
    const { rerender } = render(<Button>test</Button>);
    expect(screen.getByRole('button')).toBeEnabled();

    rerender(<Button disabled>test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render with a default button type of button', () => {
    render(<Button>test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test.each(['button', 'submit', 'reset'])(
    'it should support changing the button type to %s with the `type` prop',
    (type) => {
      render(<Button type={type}>test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', type);
    }
  );

  it('should render as an element with the role of `link` when the `href` prop is used', () => {
    render(<Button href="/">test</Button>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should support rendering as a custom element with the `as` prop', () => {
    function CustomComponent(props) {
      return <div data-testid="custom-component" {...props} />;
    }

    render(
      <Button as={CustomComponent} data-test="test">
        test
      </Button>
    );
    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
    expect(screen.getByTestId('custom-component')).toHaveAttribute(
      'data-test',
      'test'
    );
  });

  it.each([
    ['primary', 'cds--btn'],
    ['secondary', 'cds--btn--secondary'],
    ['ghost', 'cds--btn--ghost'],
    ['danger', 'cds--btn--danger'],
    ['danger--primary', 'cds--btn--danger--primary'],
    ['danger--ghost', 'cds--btn--danger--ghost'],
    ['danger--tertiary', 'cds--btn--danger--tertiary'],
    ['tertiary', 'cds--btn--tertiary'],
  ])(
    'should set the expected classes for the button of kind: `%s`',
    (kind, className) => {
      render(
        <Button className={className} kind={kind}>
          test
        </Button>
      );
      expect(screen.getByText('test')).toHaveClass(className);
    }
  );

  it.each([
    ['sm', 'cds--btn--sm'],
    ['md', 'cds--btn--md'],
    ['lg', 'cds--btn--lg'],
    ['xl', 'cds--btn--xl'],
    ['2xl', 'cds--btn--2xl'],
  ])(
    'should set the expected classes for the button of size: `%s`',
    (size, className) => {
      render(
        <Button className={className} size={size}>
          test
        </Button>
      );
      expect(screen.getByText('test')).toHaveClass(className);
    }
  );

  describe('Button with Icon variant', () => {
    it('should render the given icon within the <button> element', () => {
      render(
        <Button
          iconDescription="test"
          renderIcon={() => <svg data-testid="svg" />}>
          test
        </Button>
      );
      expect(screen.getByRole('button')).toContainElement(
        screen.getByTestId('svg')
      );
    });

    it('should report a prop violation error if `renderIcon` is passed without `iconDescription` and `children`', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<Button renderIcon={Search} />);

      try {
        expect(spy).toHaveBeenCalled();
      } finally {
        spy.mockRestore();
      }
    });
  });

  describe('Icon Button variant', () => {
    it('should set the icon-only class', () => {
      render(<Button hasIconOnly iconDescription="test" renderIcon={Add} />);
      expect(screen.getByLabelText('test')).toHaveClass('cds--btn--icon-only');
    });

    it('should support rendering as a custom element with the `as` prop', () => {
      function CustomComponent(props) {
        return <div data-testid="custom-component" {...props} />;
      }

      render(
        <Button
          hasIconOnly
          iconDescription="test"
          renderIcon={Add}
          as={CustomComponent}
        />
      );
      expect(screen.getByTestId('custom-component')).toBeInTheDocument();
      expect(screen.getByLabelText('test')).toHaveClass('cds--btn--icon-only');
    });
  });
});
