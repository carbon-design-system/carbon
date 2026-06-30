/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FluidPasswordInput from '../FluidPasswordInput';

const prefix = 'cds';

describe('FluidPasswordInput', () => {
  it('should render with fluid classes', async () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <FluidPasswordInput id="input-1" labelText="PasswordInput label" />
    );
    expect(container.firstChild).toHaveClass(`cds--text-input--fluid`);
  });

  it('should add disabled classes when disabled', () => {
    const { container } = render(
      <FluidPasswordInput
        disabled
        id="input-1"
        labelText="PasswordInput label"
      />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--text-input--fluid--disabled`
    );
    expect(screen.getByLabelText('PasswordInput label')).toBeDisabled();
  });
});
