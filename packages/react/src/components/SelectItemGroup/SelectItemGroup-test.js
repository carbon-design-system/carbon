/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItemGroup from './SelectItemGroup';
import { render, screen } from '@testing-library/react';
import SelectItem from '../SelectItem';

const prefix = 'cds';

const requiredProps = {
  label: 'testLabel',
};

describe('SelectItemGroup', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <SelectItemGroup {...requiredProps} data-testid="test-id" />
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render children as expected', () => {
      render(
        <SelectItemGroup {...requiredProps}>
          <SelectItem value="test" text="testText" />
        </SelectItemGroup>
      );

      expect(screen.getByText('testText')).toBeInTheDocument();
    });

    it('should have the expected classes', () => {
      const { container } = render(<SelectItemGroup {...requiredProps} />);
      expect(container.firstChild).toHaveClass(`${prefix}--select-optgroup`);
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <SelectItemGroup {...requiredProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('Should not be disabled by default', () => {
      const { container } = render(<SelectItemGroup {...requiredProps} />);
      expect(container.firstChild).toBeEnabled();
    });

    it('should set disabled as expected', () => {
      const { container } = render(
        <SelectItemGroup {...requiredProps} disabled />
      );
      expect(container.firstChild).toHaveAttribute('disabled');
    });

    it('should respect label prop', () => {
      const { container } = render(<SelectItemGroup {...requiredProps} />);
      expect(container.firstChild).toHaveAttribute('label', 'testLabel');
    });
  });
});
