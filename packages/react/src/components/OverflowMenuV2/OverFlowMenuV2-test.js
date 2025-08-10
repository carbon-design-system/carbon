/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, screen } from '@testing-library/react';

import { FeatureFlags } from '../FeatureFlags';
import { MenuItem } from '../Menu';
import { OverflowMenuV2 } from './';
import React from 'react';
import { action } from 'storybook/actions';
import userEvent from '@testing-library/user-event';

describe('<OverflowMenuV2 />', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should log the deprecation warning when rendering OverflowMenuV2', () => {
    const onClick = action('onClick (MenuItem)');

    render(
      <OverflowMenuV2>
        <MenuItem label="Stop app" onClick={onClick} />
      </OverflowMenuV2>
    );

    // Check if the deprecation warning is logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '`<OverflowMenuV2>` is deprecated and will be removed in the next major version.'
      )
    );
  });

  it('should render correctly with feature flag enabled', async () => {
    const { getByRole, findByText } = render(
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenuV2>
          <MenuItem label="Stop app" />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenuV2>
      </FeatureFlags>
    );

    await act(async () => {
      const button = getByRole('button', { name: /options/i });
      button.click();
    });

    expect(await findByText('Stop app')).toBeInTheDocument();
    expect(await findByText('Delete app')).toBeInTheDocument();
  });

  it('should respect align prop', () => {
    const { container } = render(
      <OverflowMenuV2 autoAlign>
        <MenuItem label="Stop app" />
      </OverflowMenuV2>
    );

    expect(container.firstChild).toHaveClass('cds--autoalign');
  });

  it('should render OverflowMenu with MenuItem children', async () => {
    render(
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenuV2>
          <MenuItem label="Stop app" />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenuV2>
      </FeatureFlags>
    );

    const button = screen.getByRole('button', { name: /options/i });

    await userEvent.click(button);

    const stopAppMenuItem = await screen.findByRole('menuitem', {
      name: /Stop app/i,
    });
    const deleteAppMenuItem = await screen.findByRole('menuitem', {
      name: /Delete app/i,
    });

    expect(stopAppMenuItem).toBeInTheDocument();
    expect(deleteAppMenuItem).toBeInTheDocument();
  });
});
