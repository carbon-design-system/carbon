/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItem from '../SelectItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SelectItem', () => {
  describe('Renders as expected', () => {
    const renderSelectItem = (props) =>
      render(
        <SelectItem
          className="extra-class"
          text="test"
          value="testValue"
          {...props}
        />
      );

    it('Has the expected classes', () => {
      renderSelectItem();
      expect(screen.getByText('test')).toHaveClass(`${prefix}--select-option`);
    });

    it('Should add extra classes that are passed via className', () => {
      renderSelectItem();
      expect(screen.getByText('test')).toHaveClass('extra-class');
    });

    it('Should add the value that is passed', () => {
      renderSelectItem();
      expect(screen.getByText('test')).toHaveAttribute('value', 'testValue');
    });

    it('Should not be disabled by default', () => {
      renderSelectItem();
      expect(screen.getByText('test')).not.toHaveAttribute('disabled');
    });

    it('should set disabled as expected', () => {
      renderSelectItem({ disabled: true });
      expect(screen.getByText('test')).toHaveAttribute('disabled');
    });

    it('should be hidden by default', () => {
      renderSelectItem();
      expect(screen.getByText('test')).not.toHaveAttribute('hidden');
    });

    it('should set hidden as expected', () => {
      renderSelectItem({ hidden: true });
      expect(screen.getByText('test')).toHaveAttribute('hidden');
    });
  });
});
