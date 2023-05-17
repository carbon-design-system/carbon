/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import InlineCheckbox from '../InlineCheckbox';
import userEvent from '@testing-library/user-event';

describe('InlineCheckbox', () => {
  it('should render', () => {
    render(
      <InlineCheckbox aria-label="test-label" id="test-id" name="test-name" />
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should only propagate click events from the input', async () => {
    const onClick = jest.fn();
    render(
      /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
      <div onClick={onClick}>
        <InlineCheckbox aria-label="test-label" id="test-id" name="test-name" />
      </div>
    );
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
