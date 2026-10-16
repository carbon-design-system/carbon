/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationsPanel } from '../NotificationsPanel';

const prefix = 'cds';
const blockClass = `${prefix}--notifications-panel`;
const componentName = NotificationsPanel.displayName;

// window.matchMedia is not available in jsdom — mock it for usePrefersReducedMotion
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const onNotificationClickFn = jest.fn();
const onDismissSingleNotificationFn = jest.fn();
const onClickOutside = jest.fn();

const testData = [
  {
    id: 0,
    type: 'error',
    title: 'Test notification title',
    description:
      'Test description that is extra long to test read more read less button. Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: new Date(),
    onNotificationClick: onNotificationClickFn,
  },
  {
    id: 1,
    type: 'warning',
    title: 'System alert',
    description: 'Email classification was exported successfully.',
    timestamp: new Date(),
    onNotificationClick: onNotificationClickFn,
  },
  {
    id: 2,
    type: 'success',
    title: 'Connection succeeded',
    description: 'Successfully connected cartridge',
    timestamp: new Date(),
    onNotificationClick: onNotificationClickFn,
  },
  {
    id: 3,
    type: 'informational',
    title: 'Logs are now being monitored',
    link: {
      text: 'View logs',
      url: 'https://www.carbondesignsystem.com/',
    },
    timestamp: new Date(),
    onNotificationClick: onNotificationClickFn,
  },
];

const renderNotifications = (props = {}) =>
  render(
    <NotificationsPanel
      open={true}
      onClickOutside={onClickOutside}
      data={[]}
      {...props}
    />
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe(componentName, () => {
  it('renders the notification panel', () => {
    renderNotifications();
    expect(screen.queryAllByText(/Notifications/i)).toBeTruthy();
  });

  it('adds the Devtools attribute to the containing node', () => {
    const { container } = renderNotifications({ 'data-testid': 'test-np' });
    expect(screen.getByTestId('test-np')).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderNotifications({ ref, data: [] });
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });

  it('adds additional properties to the containing node', () => {
    const { container } = renderNotifications({ 'data-testid': 'extra-attr' });
    expect(
      container.querySelector(`.${blockClass}[data-testid="extra-attr"]`)
    ).toBeInTheDocument();
  });

  it('should render notifications empty state', () => {
    renderNotifications({ data: [] });
    expect(screen.getByText(/you do not have any notifications/i)).toBeTruthy();
  });

  it('should not render a notifications panel when open is false', () => {
    const { container } = renderNotifications({ data: [], open: false });
    expect(container.querySelector(`.${blockClass}`)).not.toBeInTheDocument();
  });

  it('should render notification with error state svg', () => {
    const { container } = renderNotifications({
      data: [{ id: 0, type: 'error', title: 'Error', timestamp: new Date() }],
    });
    expect(
      container.querySelector(
        `svg.${blockClass}__notification-status-icon-error`
      )
    ).toBeTruthy();
  });

  it('should render notification with warning state svg', () => {
    const { container } = renderNotifications({
      data: [
        { id: 0, type: 'warning', title: 'Warning', timestamp: new Date() },
      ],
    });
    expect(
      container.querySelector(
        `svg.${blockClass}__notification-status-icon-warning`
      )
    ).toBeTruthy();
  });

  it('should render notification with success state svg', () => {
    const { container } = renderNotifications({
      data: [
        { id: 0, type: 'success', title: 'Success', timestamp: new Date() },
      ],
    });
    expect(
      container.querySelector(
        `svg.${blockClass}__notification-status-icon-success`
      )
    ).toBeTruthy();
  });

  it('should render notification with informational state svg', () => {
    const { container } = renderNotifications({
      data: [
        { id: 0, type: 'informational', title: 'Info', timestamp: new Date() },
      ],
    });
    expect(
      container.querySelector(
        `svg.${blockClass}__notification-status-icon-informational`
      )
    ).toBeTruthy();
  });

  it('should render link in notification', () => {
    const link = {
      text: 'View logs',
      url: 'https://www.carbondesignsystem.com/',
    };
    renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'Info',
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
  });

  it('should render Read more button', () => {
    renderNotifications({ data: testData });
    expect(screen.getAllByText(/read more/i).length).toBeGreaterThan(0);
  });

  it('should click the read more button to toggle Read less', async () => {
    renderNotifications({ data: testData });
    const readLessClass = `${blockClass}__notification-read-less-button`;
    const notificationEl = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const readMoreButton = notificationEl.querySelector(
      `.${blockClass}__notification-read-more-button`
    );
    await act(() => userEvent.click(readMoreButton));
    expect(notificationEl.querySelector(`.${readLessClass}`)).toHaveClass(
      readLessClass
    );
  });

  it('should dismiss a single notification', async () => {
    renderNotifications({
      data: testData,
      onDismissSingleNotification: onDismissSingleNotificationFn,
    });
    const notificationEl = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    const dismissBtn = notificationEl.querySelector(
      `.${blockClass}__dismiss-single-button`
    );
    await act(() => userEvent.click(dismissBtn));
    expect(onDismissSingleNotificationFn).toHaveBeenCalled();
  });

  it('should call keydown handler on notification Enter key', () => {
    renderNotifications({ data: testData });
    const notificationEl = screen.getByText(/Test notification title/i)
      .parentNode.parentNode;
    fireEvent.keyDown(notificationEl, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    expect(onNotificationClickFn).toHaveBeenCalled();
  });

  it('should call the dismiss all notifications event handler', async () => {
    const onDismissAllFn = jest.fn();
    renderNotifications({
      data: testData,
      onDismissAllNotifications: onDismissAllFn,
    });
    await act(() => userEvent.click(screen.getByText(/Dismiss all/i)));
    expect(onDismissAllFn).toHaveBeenCalled();
  });

  it('should call the onViewAll and onSettings event handlers', async () => {
    const onViewAllFn = jest.fn();
    const onSettingsFn = jest.fn();
    const { container } = renderNotifications({
      data: testData,
      onViewAllClick: onViewAllFn,
      onSettingsClick: onSettingsFn,
    });
    await act(() =>
      userEvent.click(screen.getByText(`View all (${testData.length})`))
    );
    await act(() =>
      userEvent.click(
        container.querySelector(`.${blockClass}__settings-button`)
      )
    );
    expect(onViewAllFn).toHaveBeenCalled();
    expect(onSettingsFn).toHaveBeenCalled();
  });

  it('should close the panel when Escape key is pressed', async () => {
    const { container } = renderNotifications({ data: [] });
    container.querySelector(`.${blockClass}`).focus();
    await act(() => userEvent.keyboard('{Escape}'));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it('should toggle do not disturb switch', async () => {
    const onToggle = jest.fn();
    renderNotifications({ onDoNotDisturbChange: onToggle, data: [] });
    await act(() =>
      userEvent.click(screen.getByRole('switch', { name: /Do not disturb/i }))
    );
    expect(onToggle).toHaveBeenCalled();
  });

  it('should return focus to trigger button when clicking outside on non-actionable element', async () => {
    const triggerButtonRef = React.createRef();
    const button = document.createElement('button');
    document.body.appendChild(button);
    triggerButtonRef.current = button;
    renderNotifications({ triggerButtonRef, open: true, data: [] });
    await userEvent.click(document.body);
    await waitFor(() => {
      expect(document.activeElement).toBe(button);
    });
    document.body.removeChild(button);
  });

  it('should render the correct language for the specified locale', () => {
    // "jetzt" is German for "now"
    renderNotifications({
      data: [
        {
          id: 0,
          type: 'informational',
          title: 'Info',
          timestamp: new Date(),
        },
      ],
      dateTimeLocale: 'de',
    });
    expect(screen.getByText(/jetzt/i)).toBeTruthy();
  });
});
