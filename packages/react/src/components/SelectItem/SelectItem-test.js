/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItem from './SelectItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SelectItem', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(<SelectItem data-testid="test-id" text={'testText'} />);
      expect(screen.getByText('testText')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('Has the expected classes', () => {
      render(<SelectItem text={'testText'} />);
      expect(screen.getByText('testText')).toHaveClass(
        `${prefix}--select-option`
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(<SelectItem className="custom-class" text={'testText'} />);
      expect(screen.getByText('testText')).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(<SelectItem disabled text={'testText'} />);
      expect(screen.getByText('testText')).toHaveAttribute('disabled');
    });

    it('Should not be disabled by default', () => {
      render(<SelectItem text={'testText'} />);
      expect(screen.getByText('testText')).not.toHaveAttribute('disabled');
    });

    it('should respect hidden prop', () => {
      render(<SelectItem hidden text={'testText'} />);
      expect(screen.getByText('testText')).toHaveAttribute('hidden');
    });

    it('should respect value prop', () => {
      render(<SelectItem text={'testText'} value={'testValue'} />);
      expect(screen.getByText('testText')).toHaveAttribute(
        'value',
        'testValue'
      );
    });
  });
});
