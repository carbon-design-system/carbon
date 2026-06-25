/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TruncatedText } from './TruncatedText';
import { pkg } from '../../settings';
import useTruncatedText from './useTruncatedText';

const blockClass = `${pkg.prefix}--truncated-text`;
const componentName = TruncatedText.displayName;

const defaultProps = {
  align: 'top',
  autoAlign: false,
  className: 'test-class',
  collapseLabel: 'View less',
  expandLabel: 'View more',
  id: 'test-id',
  lines: 3,
  value:
    'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page. Modify the behavior of the button by changing its event properties. Small buttons may be used when there is not enough space for a regular sized button. This issue is most found in tables. Small button should have three words or less. When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.',
  type: 'tooltip',
};

jest.mock('./useTruncatedText');

describe(componentName, () => {
  beforeEach(() => {
    useTruncatedText.mockReturnValue({ truncated: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders', async () => {
    useTruncatedText.mockReturnValue({ truncated: false });
    await act(async () => {
      render(<TruncatedText />);
    });
  });

  it('Expands and collapses with mouse', async () => {
    const props = { ...defaultProps, type: 'expand' };
    userEvent.setup();
    await act(async () => {
      render(<TruncatedText {...props} />);
    });
    const expandBtn = await screen.findByText(defaultProps.expandLabel);
    await act(async () => {
      userEvent.click(expandBtn);
    });
    await screen.findByText(defaultProps.collapseLabel);
  });

  it('Expands and collapses with keyboard', async () => {
    const props = { ...defaultProps, type: 'expand' };
    userEvent.setup();
    await act(async () => {
      render(<TruncatedText {...props} />);
    });
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'false'
    );
    screen.getByRole('button').focus();
    await act(async () => {
      await userEvent.keyboard('{Enter}', screen.getByRole('button'));
    });
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'true'
    );
    await act(async () => {
      await userEvent.keyboard(' ', screen.getByRole('button'));
    });
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'false'
    );
    await act(async () => {
      await userEvent.keyboard('{Shift}', screen.getByRole('button'));
    });
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe(
      'false'
    );
  });

  it('Adds additional properties to the containing node', async () => {
    await act(async () => {
      render(<TruncatedText {...defaultProps} data-testid="test" />);
    });
    screen.getByTestId('test');
  });

  it('Forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    await act(async () => {
      render(<TruncatedText {...defaultProps} ref={ref} />);
    });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('Adds the Devtools attribute to the containing node', async () => {
    await act(async () => {
      render(<TruncatedText {...defaultProps} data-testid="test" />);
    });
    expect(screen.getByTestId('test')).toHaveDevtoolsAttribute(componentName);
  });

  it('Has no accessibility violations', async () => {
    const { container } = render(<TruncatedText {...defaultProps} />);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });
});
