/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItemGroup from '../SelectItemGroup';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SelectItemGroup', () => {
  describe('Renders as expected', () => {
    const renderSelectItemGroup = (props) =>
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          label="testLabel"
          {...props}
        />
      );

    it('should have the expected classes', () => {
      renderSelectItemGroup();
      expect(screen.getByTestId('select-item-group')).toHaveClass(
        `${prefix}--select-optgroup`
      );
    });

    it('Should add extra classes that are passed via className', () => {
      renderSelectItemGroup();
      expect(screen.getByTestId('select-item-group')).toHaveClass(
        `extra-class`
      );
    });

    it('Should add the label that is passed', () => {
      renderSelectItemGroup();
      expect(screen.getByTestId('select-item-group')).toHaveAttribute(
        'label',
        'testLabel'
      );
    });

    it('Should not be disabled by default', () => {
      renderSelectItemGroup();
      expect(screen.getByTestId('select-item-group')).not.toHaveAttribute(
        'disabled'
      );
    });

    it('should set disabled as expected', () => {
      renderSelectItemGroup({ disabled: true });
      expect(screen.getByTestId('select-item-group')).toHaveAttribute(
        'disabled'
      );
    });
  });
});
