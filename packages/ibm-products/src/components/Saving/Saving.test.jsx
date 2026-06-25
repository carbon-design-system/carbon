/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Saving } from '.';

const componentName = Saving.displayName;
const defaultProps = {
  className: 'test-class',
  defaultIconDescription: 'save icon',
  defaultText: 'save',
  failIconDescription: 'failed to save icon',
  failText: 'failed to save',
  inProgressIconDescription: 'saving icon',
  inProgressText: 'saving...',
  secondaryButtonText: 'cancel',
  status: 'default',
  successIconDescription: 'saved',
  successText: 'saved',
  type: 'manual',
};

describe(componentName, () => {
  it('should render', async () => {
    render(<Saving {...defaultProps} />);
  });

  it('renders manual type', async () => {
    const { click } = userEvent;
    const onRequestSave = jest.fn();
    const onRequestCancel = jest.fn();
    const props = {
      ...defaultProps,
      onRequestSave,
      onRequestCancel,
    };

    const { rerender, getByText } = render(<Saving {...props} />);
    await act(() => click(getByText(props.defaultText)));
    expect(onRequestSave).toBeCalled();
    await act(() => click(getByText(props.secondaryButtonText)));
    expect(onRequestCancel).not.toBeCalled();
    rerender(<Saving {...props} status="in-progress" />);
    expect(getByText(props.inProgressText)).toBeVisible();
    await act(() => click(getByText(props.secondaryButtonText)));
    expect(onRequestCancel).toBeCalled();
    rerender(<Saving {...props} status="fail" />);
    expect(getByText(props.failText)).toBeVisible();
  });

  it('renders auto type', async () => {
    const props = {
      ...defaultProps,
      type: 'auto',
    };

    const { rerender, getByText } = render(<Saving {...props} />);
    expect(getByText(props.defaultText)).toBeVisible();
    rerender(<Saving {...props} status="in-progress" />);
    expect(getByText(props.inProgressText)).toBeVisible();
    rerender(<Saving {...props} status="success" />);
    expect(getByText(props.successText)).toBeVisible();
    rerender(<Saving {...props} status="fail" />);
    expect(getByText(props.failText)).toBeVisible();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <main>
        <Saving {...defaultProps} />
      </main>
    );
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const { container } = render(<Saving {...defaultProps} />);
    expect(container.firstChild).toHaveClass(defaultProps.className);
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    render(<Saving {...defaultProps} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<Saving {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<Saving {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
