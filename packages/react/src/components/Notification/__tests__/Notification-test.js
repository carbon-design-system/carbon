/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ErrorFilled } from '@carbon/icons-react';
import {
  NotificationButton,
  ToastNotification,
  InlineNotification,
  ActionableNotification,
  StaticNotification,
  Callout,
} from '../Notification';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('NotificationButton', () => {
  it('should place the `className` prop on the outermost DOM node', () => {
    const { container } = render(<NotificationButton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('supports custom icon', () => {
    const { rerender } = render(<NotificationButton />);
    const defaultIcon = screen.queryByRole('button').innerHTML;

    rerender(
      <NotificationButton
        renderIcon={(props) => <ErrorFilled size={20} {...props} />}
      />
    );
    const customIcon = screen.queryByRole('button').innerHTML;

    expect(defaultIcon).not.toEqual(customIcon);
  });

  it('interpolates matching className based on notificationType prop', () => {
    const { rerender, container } = render(<NotificationButton />);
    const notificationTypes = ['toast', 'inline'];

    notificationTypes.forEach((notificationType) => {
      rerender(<NotificationButton notificationType={notificationType} />);
      expect(container.firstChild).toHaveClass(
        `${prefix}--${notificationType}-notification__close-button`
      );
      expect(screen.queryByRole('button').firstChild).toHaveClass(
        `${prefix}--${notificationType}-notification__close-icon`
      );
    });
  });
});

describe('ToastNotification', () => {
  it('should render', () => {
    const { asFragment } = render(
      <ToastNotification title="Notification title" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have role=status by default', () => {
    const { container } = render(
      <ToastNotification title="Notification title" />
    );
    expect(container.firstChild).toHaveAttribute('role', 'status');
  });

  it('should place the `className` prop on the outermost DOM node', () => {
    const { container } = render(
      <ToastNotification title="Notification title" className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('interpolates matching className based on kind prop', () => {
    const { rerender } = render(
      <ToastNotification title="Notification title" />
    );
    const kinds = [
      'error',
      'info',
      'info-square',
      'success',
      'warning',
      'warning-alt',
    ];
    kinds.forEach((kind) => {
      rerender(<ToastNotification kind={kind} />);
      expect(screen.queryByRole('status')).toHaveClass(
        `${prefix}--toast-notification--${kind}`
      );
    });
  });

  it('allows non-interactive elements as children', () => {
    render(
      <ToastNotification title="Notification title">
        <p>Sample text</p>
      </ToastNotification>
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/Sample text/i)).toBeInTheDocument();
  });

  it('does not allow toast notification to have interactive elements as children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <ToastNotification title="Notification title">
          <button type="button">Sample button text</button>
        </ToastNotification>
      );
    }).toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not render close button when `hideCloseButton` is provided', () => {
    render(<ToastNotification title="Notification title" hideCloseButton />);
    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('calls `onClose` when notification is closed', async () => {
    const onClose = jest.fn();
    render(<ToastNotification title="Notification title" onClose={onClose} />);

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('keeps notification open if `onClose` returns false', async () => {
    render(
      <ToastNotification title="Notification title" onClose={() => false} />
    );

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByRole('status')).toBeInTheDocument();
  });

  it('calls `onCloseButtonClick` when notification is closed', async () => {
    const onCloseButtonClick = jest.fn();
    render(
      <ToastNotification
        title="Notification title"
        onCloseButtonClick={onCloseButtonClick}
      />
    );

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
  });
});

describe('InlineNotification', () => {
  it('should render', () => {
    const { asFragment } = render(
      <InlineNotification title="Notification title" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have role=status by default', () => {
    const { container } = render(
      <InlineNotification title="Notification title" />
    );
    expect(container.firstChild).toHaveAttribute('role', 'status');
  });

  it('should place the `className` prop on the outermost DOM node', () => {
    const { container } = render(
      <InlineNotification title="Notification title" className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('interpolates matching className based on kind prop', () => {
    const { rerender } = render(
      <InlineNotification title="Notification title" />
    );
    const kinds = [
      'error',
      'info',
      'info-square',
      'success',
      'warning',
      'warning-alt',
    ];
    kinds.forEach((kind) => {
      rerender(<InlineNotification title="Notification title" kind={kind} />);
      expect(screen.queryByRole('status')).toHaveClass(
        `${prefix}--inline-notification--${kind}`
      );
    });
  });

  it('allows non-interactive elements as children', () => {
    render(
      <InlineNotification title="Notification title">
        <p>Sample text</p>
      </InlineNotification>
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/Sample text/i)).toBeInTheDocument();
  });

  it('does not allow inline notification to have interactive elements as children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <InlineNotification title="Notification title">
          <button type="button">Sample button text</button>
        </InlineNotification>
      );
    }).toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not render close button when `hideCloseButton` is provided', () => {
    render(<InlineNotification title="Notification title" hideCloseButton />);
    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('calls `onClose` when notification is closed', async () => {
    const onClose = jest.fn();
    render(<InlineNotification title="Notification title" onClose={onClose} />);

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('keeps notification open if `onClose` returns false', async () => {
    render(
      <InlineNotification title="Notification title" onClose={() => false} />
    );

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByRole('status')).toBeInTheDocument();
  });

  it('calls `onCloseButtonClick` when notification is closed', async () => {
    const onCloseButtonClick = jest.fn();
    render(
      <InlineNotification
        title="Notification title"
        onCloseButtonClick={onCloseButtonClick}
      />
    );

    const closeButton = screen.queryByRole('button', {
      hidden: true,
    });
    await userEvent.click(closeButton);
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
  });
});

describe('ActionableNotification', () => {
  it('should render', () => {
    const { asFragment } = render(
      <ActionableNotification actionButtonLabel="My custom action" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('uses role=alertdialog', () => {
    const { container } = render(
      <ActionableNotification actionButtonLabel="My custom action" />
    );

    expect(container.firstChild).toHaveAttribute('role', 'alertdialog');
  });

  it('renders correct action label', () => {
    render(<ActionableNotification actionButtonLabel="My custom action" />);
    const actionButton = screen.queryByRole('button', {
      name: 'My custom action',
    });
    expect(actionButton).toBeInTheDocument();
  });

  it('closes notification via escape button when focus is placed on the notification', async () => {
    const onCloseButtonClick = jest.fn();
    const onClose = jest.fn();
    render(
      <ActionableNotification
        onClose={onClose}
        onCloseButtonClick={onCloseButtonClick}
        actionButtonLabel="My custom action"
      />
    );

    // after focus is placed, the notification should close via escape
    await userEvent.keyboard('{Escape}');
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });
});

// TODO: Remove StaticNotification tests when StaticNotification is removed (v12)
describe('StaticNotification', () => {
  it('logs a deprecation notice when used', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() => {
      render(<StaticNotification title="Notification title" />);
    }).not.toThrow();

    expect(spy).toHaveBeenCalledWith(
      'Warning: `StaticNotification` has been renamed to `Callout`.' +
        'Run the following codemod to automatically update usages in your' +
        'project: `npx @carbon/upgrade migrate refactor-to-callout --write`'
    );
    spy.mockRestore();
  });
});

describe('Callout', () => {
  it('should place the `className` prop on the outermost DOM node', () => {
    const { container } = render(<Callout className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('calls `onActionButtonClick` when action button is clicked', async () => {
    const onActionButtonClick = jest.fn();
    render(
      <Callout
        title="Notification title"
        actionButtonLabel="action-button"
        onActionButtonClick={onActionButtonClick}
      />
    );

    const closeButton = screen.queryByRole('button', {
      name: 'action-button',
      hidden: true,
    });
    await userEvent.click(closeButton);
    expect(onActionButtonClick).toHaveBeenCalledTimes(1);
  });

  it('interpolates matching className based on kind prop', () => {
    const { rerender, container } = render(
      <Callout title="Notification title" />
    );
    const kinds = ['info', 'warning'];
    kinds.forEach((kind) => {
      rerender(<Callout title="Notification title" kind={kind} />);
      expect(container.firstChild).toHaveClass(
        `${prefix}--actionable-notification--${kind}`
      );
    });
  });

  it('places low contrast class based on lowContrast prop', () => {
    const { container } = render(
      <Callout title="Notification title" lowContrast />
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--actionable-notification--low-contrast`
    );
  });

  it('allows non-interactive elements as children', () => {
    render(
      <Callout title="Notification title">
        <p>Sample text</p>
      </Callout>
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/Sample text/i)).toBeInTheDocument();
  });

  it('allows interactive elements as children', () => {
    render(
      <Callout title="Notification title" titleId="interactive-test">
        <button aria-describedby="interactive-test">Sample text</button>
      </Callout>
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/Sample text/i)).toBeInTheDocument();
  });

  it('supports `title`, `subtitle`, `titleId` props', () => {
    const { container } = render(
      <Callout title="A title" subtitle="A subtitle" titleId="aTitleID">
        <p>Sample text</p>
      </Callout>
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText(/A title/i)).toBeInTheDocument();
    expect(screen.queryByText(/A subtitle/i)).toBeInTheDocument();
    expect(screen.queryByText(/A title/i)).toHaveAttribute('id', 'aTitleID');
  });

  it('enforces aria-describedby on interactive children elements', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <Callout title="Notification title" titleId="titleId">
          <button type="button" aria-describedby="titleId">
            Sample button text
          </button>
        </Callout>
      );
    }).not.toThrow();

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
