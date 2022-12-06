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
    it('should have the expected classes', () => {
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          label="testLabel"
        />
      );

      expect(screen.getByTestId('select-item-group')).toHaveClass(
        `${prefix}--select-optgroup`
      );
    });

    it('Should add extra classes that are passed via className', () => {
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          label="testLabel"
        />
      );

      expect(screen.getByTestId('select-item-group')).toHaveClass(
        `extra-class`
      );
    });

    it('Should add the label that is passed', () => {
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          label="testLabel"
        />
      );

      expect(screen.getByTestId('select-item-group')).toHaveAttribute(
        'label',
        'testLabel'
      );
    });

    it('Should not be disabled by default', () => {
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          label="testLabel"
        />
      );

      expect(screen.getByTestId('select-item-group')).not.toHaveAttribute(
        'disabled'
      );
    });

    it('should set disabled as expected', () => {
      render(
        <SelectItemGroup
          className="extra-class"
          data-testid="select-item-group"
          disabled
          label="testLabel"
        />
      );

      expect(screen.getByTestId('select-item-group')).toHaveAttribute(
        'disabled'
      );
    });
  });
});
