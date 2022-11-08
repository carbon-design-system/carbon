/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import NotificationStack from './NotificationStack';
import Button from '../Button/Button';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { triggerNotification } from '../../internal/useNotification/notification';

describe('NotificationStack', () => {
  it('should render a notification', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<NotificationStack />);
    render(
      <Button
        onClick={() =>
          triggerNotification({
            role: 'alert',
            kind: 'info',
            caption: '00:00',
            onCloseButtonClick: () => {},
            lowContrast: false,
            hideCloseButton: false,
            iconDescription: 'Close',
            title: 'Toast triggered',
            subtitle: 'subtitle testing',
          })
        }
      >
        Trigger toast
      </Button>
    );

    userEvent.click(screen.getByText('Trigger toast'));

    // expect notification wrapper to exists
    expect(container.firstChild).toHaveClass('cds-stack-notif-container');
    expect(screen.findByText('Toast triggered')).toBeDefined();
    spy.mockRestore();
  });
  it('should render muultiple notification', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<NotificationStack />);
    render(
      <Button
        onClick={() =>
          triggerNotification({
            role: 'alert',
            kind: 'info',
            caption: '00:00',
            onCloseButtonClick: () => {},
            lowContrast: false,
            hideCloseButton: false,
            iconDescription: 'Close',
            title: 'Toast triggered',
            subtitle: 'subtitle testing',
          })
        }
      >
        Trigger toast
      </Button>
    );

    userEvent.click(screen.getByText('Trigger toast'));
    userEvent.click(screen.getByText('Trigger toast'));
    userEvent.click(screen.getByText('Trigger toast'));

    await waitFor(() => {
      expect(screen.queryAllByText('Toast triggered')).toHaveLength(4);
    });

    spy.mockRestore();
  });
});
