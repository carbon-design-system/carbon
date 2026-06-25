// cspell:words jetzt

/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import React from 'react';

import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg } from '../../settings';

import { NotificationsPanel } from '.';
import data from './NotificationsPanel_data';

const blockClass = `${pkg.prefix}--notifications-panel`;
const dataTestId = uuidv4();
const onNotificationClickFn = jest.fn();
const onDismissSingleNotificationFn = jest.fn();
const testData = [
  ...data,
  {
    id: uuidv4(),
    type: 'error',
    title: 'Test notification title',
    description:
      'Test description that is extra long to test read more read less button. Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: new Date(),
    onNotificationClick: onNotificationClickFn,
  },
];

const onClickOutside = jest.fn();
const renderNotifications = ({ ...rest } = {}) =>
  render(
    <NotificationsPanel
      {...{
        open: true,
        onClickOutside,
        ...rest,
      }}
    />
  );

describe('Notifications', () => {
  it('renders the notification panel', async () => {
    const { animationStart, animationEnd } = fireEvent;
    const { container, rerender } = renderNotifications({
      data: [],
    });
    expect(screen.queryAllByText(/Notifications/i)).toBeTruthy();
    const outerElement = container.querySelector(`.${blockClass}`);
    await act(() => userEvent.click(container));
    expect(onClickOutside).toHaveBeenCalled();
    animationStart(outerElement);
    rerender(
      <NotificationsPanel open={false} onClickOutside={jest.fn()} data={[]} />
    );
    animationEnd(outerElement);
  });

  it('should toggle do not disturb switch', async () => {
    const { fn } = jest;
    const onToggle = fn();
    renderNotifications({
      onDoNotDisturbChange: onToggle,
      data: [],
    });

    await act(() =>
      userEvent.click(screen.getByRole('switch', /Do not disturb/i))
    );
    expect(onToggle).toBeCalled();
  });

  it('should render notifications empty state', async () => {
    renderNotifications({
      data: [],
    });
    expect(screen.getByText(/you do not have any notifications/i)).toBeTruthy();
  });

  it('should render notification with error state svg', async () => {
    const { container } = renderNotifications({
      data: [
        {
          id: 0,
          type: 'error',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
        },
      ],
    });
    const renderedEmptyStateSvg = container.querySelectorAll(
      `svg.${blockClass}__notification-status-icon-error`
    );
    expect(renderedEmptyStateSvg[0]).toBeTruthy();
  });

  it('should render notification with warning state svg', async () => {
    const { container } = renderNotifications({
      data: [
        {
          id: 0,
          type: 'warning',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
        },
      ],
    });
    const renderedEmptyStateSvg = container.querySelectorAll(
      `svg.${blockClass}__notification-status-icon-warning`
    );
    expect(renderedEmptyStateSvg[0]).toBeTruthy();
  });

  it('should render notification with success state svg', async () => {
    const { container } = renderNotifications({
      data: [
        {
          id: 0,
          type: 'success',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
        },
      ],
    });
    const renderedEmptyStateSvg = container.querySelectorAll(
      `svg.${blockClass}__notification-status-icon-success`
    );
    expect(renderedEmptyStateSvg[0]).toBeTruthy();
  });

  it('should render notification with informational state svg', async () => {
    const { container } = renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
        },
      ],
    });
    const renderedEmptyStateSvg = container.querySelectorAll(
      `svg.${blockClass}__notification-status-icon-informational`
    );
    expect(renderedEmptyStateSvg[0]).toBeTruthy();
  });

  it('should render link in notification', async () => {
    const link = {
      text: 'View logs',
      url: 'https://www.carbondesignsystem.com/',
    };
    renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
          link,
          onNotificationClick: () => {},
        },
      ],
      dateTimeLocale: 'de',
    });
    const logLink = screen.getByRole('link');
    expect(logLink).toHaveTextContent(link.text);
    expect(logLink).toHaveAttribute('href', link.url);
    // REACT 18: We were testing clicking of a link, which caused an error to be logged
    // Error: Not implemented: navigation (except hash changes)
  });

  it('should render Read more button', async () => {
    renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'LogRhythm connection failure',
          description:
            'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
          timestamp: new Date(),
        },
      ],
    });
    expect(screen.getByText(/read more/i)).toBeTruthy();
  });

  it('adds additional properties to the containing node', async () => {
    const { container } = renderNotifications({
      data: [],
      'data-testid': dataTestId,
    });
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderNotifications({
      ref,
      data: [],
    });
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderNotifications({
      data: [],
      'data-testid': dataTestId,
    });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      NotificationsPanel.displayName
    );
  });

  it('should close the notifications panel when click is detected outside', async () => {
    const { container } = renderNotifications({
      data: [],
    });
    await act(() => userEvent.click(container));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it('should close the notifications panel when esc key is pressed', async () => {
    const { container } = renderNotifications({
      data: [],
    });
    container.querySelector(`.${blockClass}`).focus();
    await act(() => userEvent.keyboard('{Escape}'));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it('should return focus to trigger button when clicking outside and not on actionable element', async () => {
    const triggerButtonRef = React.createRef();
    const button = document.createElement('button');
    document.body.appendChild(button);
    triggerButtonRef.current = button;
    renderNotifications({
      triggerButtonRef,
      open: true,
      data: [],
    });
    await userEvent.click(document.body);
    await waitFor(() => {
      expect(document.activeElement).toBe(button);
    });
  });
  it('should not return focus to trigger button when clicking outside but on an actionable element', async () => {
    const triggerButtonRef = React.createRef();
    const button = document.createElement('button');
    document.body.appendChild(button);
    const buttonAction = document.createElement('button');
    document.body.appendChild(buttonAction);
    triggerButtonRef.current = button;
    renderNotifications({
      triggerButtonRef,
      open: true,
      data: [],
    });
    await userEvent.click(buttonAction);
    expect(document.activeElement).not.toBe(button);
    expect(document.activeElement).toBe(buttonAction);
  });

  it('should not render a notifications panel when open is false', async () => {
    const { container } = renderNotifications({
      data: [],
      open: false,
    });
    expect(container.querySelector(`.${blockClass}`)).not.toBeInTheDocument();
  });

  it('should click the read more label on a notification with a long description, then render `Read less` button', async () => {
    renderNotifications({
      data: testData,
    });
    const readLessClassName = `${blockClass}__notification-read-less-button`;
    const notificationElement = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const readMoreButton = notificationElement.querySelector(
      `.${blockClass}__notification-read-more-button`
    );
    await act(() => userEvent.click(readMoreButton));
    const readLessButton = notificationElement.querySelector(
      `.${readLessClassName}`
    );
    expect(readLessButton).toHaveClass(readLessClassName);
  });

  it('should dismiss a single notification', async () => {
    renderNotifications({
      data: testData,
      onDismissSingleNotification: onDismissSingleNotificationFn,
    });
    const notificationElement = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const dismissSingleNotificationClass = `${blockClass}__dismiss-single-button`;
    const dismissIconButtonElement = notificationElement.querySelector(
      `.${dismissSingleNotificationClass}`
    );
    await act(() => userEvent.click(dismissIconButtonElement));
    expect(onDismissSingleNotificationFn).toBeCalled();
  });

  it('should simulate a keydown event on a single notification', async () => {
    renderNotifications({
      data: testData,
    });
    const notificationElement = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    fireEvent.keyDown(notificationElement, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(onNotificationClickFn).toBeCalled();
  });

  it('should stop propagation of notification event if key event is fired upon dismiss single notification icon button', async () => {
    renderNotifications({
      data: testData,
      onDismissSingleNotification: onDismissSingleNotificationFn,
    });
    const notificationElement = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const dismissSingleNotificationClass = `${blockClass}__dismiss-single-button`;
    const dismissIconButtonElement = notificationElement.querySelector(
      `.${dismissSingleNotificationClass}`
    );
    fireEvent.keyDown(dismissIconButtonElement, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(onNotificationClickFn).toBeCalledTimes(0);
  });

  it('should call the dismiss all notifications event handler', async () => {
    const onDismissAllNotificationsFn = jest.fn();
    renderNotifications({
      data,
      onDismissAllNotifications: onDismissAllNotificationsFn,
    });
    await act(() => userEvent.click(screen.getByText(/Dismiss all/i)));
    expect(onDismissAllNotificationsFn).toBeCalled();
  });

  it('should call the onViewAll event handler', async () => {
    const onViewAllFn = jest.fn();
    const onSettingsClickFn = jest.fn();
    const { container } = renderNotifications({
      data,
      onViewAllClick: onViewAllFn,
      onSettingsClick: onSettingsClickFn,
    });
    await act(() =>
      userEvent.click(screen.getByText(`View all (${data.length})`))
    );
    await act(() =>
      userEvent.click(
        container.querySelector(`.${blockClass}__settings-button`)
      )
    );
    expect(onViewAllFn).toBeCalled();
    expect(onSettingsClickFn).toBeCalled();
  });

  it('should click onDismissAllNotification and onDismissSingleNotifications buttons to test default props', async () => {
    renderNotifications({
      data: testData,
    });
    const dismissAllButton = screen.getByText(/Dismiss all/i);
    await act(() => userEvent.click(dismissAllButton));
    const notificationElement = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const dismissSingleNotificationClass = `${blockClass}__dismiss-single-button`;
    const dismissIconButtonElement = notificationElement.querySelector(
      `.${dismissSingleNotificationClass}`
    );
    await act(() => userEvent.click(dismissIconButtonElement));
  });

  it('should render the correct language for the specified locale', async () => {
    renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'LogRhythm connection failure',
          timestamp: new Date(),
        },
      ],
      dateTimeLocale: 'de',
    });
    // Will render English "now" as German "jetzt".
    expect(screen.getByText(/jetzt/i)).toBeTruthy();
  });
});
