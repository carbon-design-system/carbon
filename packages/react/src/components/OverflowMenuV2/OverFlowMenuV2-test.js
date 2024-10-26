/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OverflowMenu } from '../OverflowMenu';
import { OverflowMenuV2 } from './';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('../OverflowMenu', () => ({
  OverflowMenu: jest.fn(() => <div>Mocked OverflowMenu</div>),
}));

jest.mock('../FeatureFlags', () => ({
  FeatureFlags: ({ children }) => <div>{children}</div>,
}));

describe('<OverflowMenuV2 />', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('renders OverflowMenu wrapped in FeatureFlags', () => {
    const { getByText } = render(<OverflowMenuV2 />);
    expect(getByText('Mocked OverflowMenu')).toBeInTheDocument();
  });

  it('passes props to OverflowMenu', () => {
    const props = { item1: 'value1', item2: 'value2' };
    render(<OverflowMenuV2 {...props} />);

    expect(OverflowMenu).toHaveBeenCalledWith(props, expect.anything());
  });
});
