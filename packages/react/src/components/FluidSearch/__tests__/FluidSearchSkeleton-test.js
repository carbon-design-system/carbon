/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidSearchSkeleton from '../FluidSearch.Skeleton';
import { FormContext } from '../../FluidForm/FormContext';
import React from 'react';
import { render } from '@testing-library/react';

const prefix = 'cds';

describe('FluidSearchSkeleton', () => {
  it('should render as expected', () => {
    const { container } = render(
      <FluidSearchSkeleton className="test-class" />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--text-input--fluid__skeleton ${prefix}--form-item`
    );
  });

  it('should apply additional custom class names if provided', () => {
    const customClass = 'test-class';
    const { container } = render(
      <FluidSearchSkeleton className={customClass} />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--form-item ${prefix}--text-input--fluid__skeleton`
    );
    expect(container.firstChild).toHaveClass(customClass);
  });
  it('provides "isFluid" context value as true', () => {
    let contextValue;

    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <FluidSearchSkeleton />
        <FormContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FormContext.Consumer>
      </FormContext.Provider>
    );
    expect(contextValue.isFluid).toBe(true);
  });
});
