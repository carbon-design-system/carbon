/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionBarItem } from '.';
import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg, carbon } from '../../settings';

const { click } = fireEvent;

const blockClass = `${pkg.prefix}--action-bar-item`;
const componentName = ActionBarItem.displayName;

const className = `class-${uuidv4()}`;
const content = `This is example content: ${uuidv4()}`;
const dataTestId = uuidv4();
const testLabel = 'Test label';

describe(ActionBarItem.displayName, () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <main>
        <ActionBarItem label={testLabel}></ActionBarItem>
      </main>
    );
    await act(() => userEvent.tab());
    expect(screen.getByText(testLabel)).toBeVisible();
    expect(screen.getByRole('button')).toHaveFocus();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('Renders a page action item which is a Carbon Button that can be clicked', async () => {
    const myOnClick = jest.fn();

    // not enough room so should see an overflow.
    const { container } = render(
      <ActionBarItem label={testLabel} onClick={myOnClick}></ActionBarItem>
    );

    const actionBarItemElement = container.querySelector(`.${blockClass}`);
    expect(actionBarItemElement).toHaveClass(`${carbon.prefix}--btn`);

    await act(() => click(actionBarItemElement));
    expect(myOnClick).toBeCalled();
  });

  it('adds user classes', async () => {
    const { container } = render(
      <ActionBarItem label={testLabel} className={className}>
        {content}
      </ActionBarItem>
    );
    const actionBarItemElement = container.querySelector(`.${blockClass}`);
    expect(actionBarItemElement).toHaveClass(blockClass);
    expect(actionBarItemElement).toHaveClass(className);
  });

  it('ignores user size and type settings', async () => {
    const { container } = render(
      <ActionBarItem label={testLabel} size="lg" type="submit">
        {content}
      </ActionBarItem>
    );
    const actionBarItemElement = container.querySelector(`.${blockClass}`);
    expect(actionBarItemElement).not.toHaveClass(`${carbon.prefix}--btn--lg`);
    expect(actionBarItemElement).toHaveClass(`${carbon.prefix}--btn--md`);
    expect(actionBarItemElement).toHaveAttribute('type', 'button');
  });

  it('adds additional properties to the containing node', async () => {
    const { container } = render(
      <ActionBarItem label={testLabel} data-testid={dataTestId}>
        {content}
      </ActionBarItem>
    );

    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it('forwards a ref to the block element', async () => {
    const ref = React.createRef();
    render(
      <ActionBarItem label={testLabel} ref={ref}>
        {content}
      </ActionBarItem>
    );
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });
});
