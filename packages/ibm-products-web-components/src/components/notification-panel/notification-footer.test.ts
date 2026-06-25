/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { html, fixture, oneEvent } from '@open-wc/testing';
import './index';
import CDSNotificationFooter from './notification-footer';

const templateFooter = () => {
  return html`
    <c4p-notification-footer
      slot="footer"
      view-all-label="View all (10)"
      @c4p-notification-view-all=${() => {
        console.log('view all clicked');
      }}
      @c4p-notification-settings=${() => {
        console.log('Settings clicked');
      }}
    ></c4p-notification-footer>
  `;
};

describe('c4p-notification', () => {
  it('should render the notification', async () => {
    const notificationFooter = (await fixture(
      templateFooter()
    )) as CDSNotificationFooter;
    expect(notificationFooter).toBeDefined();
  });
  it('should render View All text based the "viewAllLabel" prop passed', async () => {
    const notificationFooter = (await fixture(
      templateFooter()
    )) as CDSNotificationFooter;
    expect(notificationFooter.viewAllLabel).toBe('View all (10)');
    const viewAllButton = notificationFooter.shadowRoot?.querySelector(
      '.c4p--notifications-panel__view-all-button'
    );
    expect(viewAllButton?.textContent?.trim()).toBe(
      notificationFooter.viewAllLabel
    );
  });
  it('should emit "c4p-notification-view-all" when clicked on view all button', async () => {
    const notificationFooter = (await fixture(
      templateFooter()
    )) as CDSNotificationFooter;
    const eventPromise = oneEvent(
      notificationFooter,
      'c4p-notification-view-all'
    );
    const viewAllButton = notificationFooter.shadowRoot?.querySelector(
      '.c4p--notifications-panel__view-all-button'
    ) as HTMLElement;
    viewAllButton?.click();
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
  it('should emit "c4p-notification-settings" when clicked on settings button', async () => {
    const notificationFooter = (await fixture(
      templateFooter()
    )) as CDSNotificationFooter;
    const eventPromise = oneEvent(
      notificationFooter,
      'c4p-notification-settings'
    );
    const settingsButton = notificationFooter.shadowRoot?.querySelector(
      '.c4p--notifications-panel__settings-button'
    ) as HTMLElement;
    settingsButton?.click();
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
});
