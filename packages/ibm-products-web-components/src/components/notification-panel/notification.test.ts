/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { html, fixture, oneEvent, elementUpdated } from '@open-wc/testing';
import './index';
import CDSNotification from './notification';
import { dateTimeFormat } from '@carbon/utilities';

const templateNotification = () => {
  const timeStamp = new Date(new Date().getTime() - 30 * 1000);
  return html`
    <c4p-notification
      slot="today"
      @c4p-notification-dismiss=${() => {
        console.log('dismiss notification');
      }}
      type="error"
      ?unread="true"
      .timestamp=${timeStamp}
    >
      <h4 class="c4p--notifications-panel__notification" slot="title">
        LogDNA cannot be reached.
      </h4>
      <div slot="description">Unable to communicate with LogDNA.</div>
    </c4p-notification>
  `;
};

describe('c4p-notification', () => {
  it('should render the notification', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    expect(notification).toBeDefined();
  });
  it('should render appropriate icon based the "type" prop passed', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    expect(notification.type).toBe('error');
    let iconElement = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification-status-icon-error'
    );
    expect(iconElement).not.toBeNull();
    notification.type = 'success';
    await elementUpdated(notification);
    iconElement = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification-status-icon-success'
    );
    expect(iconElement).not.toBeNull();
    notification.type = 'warning';
    await elementUpdated(notification);
    iconElement = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification-status-icon-warning'
    );
    expect(iconElement).not.toBeNull();
    notification.type = 'informational';
    await elementUpdated(notification);
    iconElement = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification-status-icon-informational'
    );
    expect(iconElement).not.toBeNull();
  });
  it('should render appropriate time label based the "timestamp" prop passed', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    const dateTimeValue = dateTimeFormat.relative.format(
      notification.timestamp as Date,
      {
        locale: 'en-US',
        style: 'long',
      }
    );

    // EXPECT THAT THE TIMESTAMP HAS A VALUE
    expect(notification.timestamp).toBeDefined();

    // CHECK IF THE NOTIFICATION TIMESTAMP IS A DATE
    expect(notification.timestamp).toEqual(expect.any(Date));

    // EXPECT THAT THE LABEL MATCHES THE DATETIME VALUE PASSED TO THE COMPONENT
    const notificationTimeLabel = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification-time-label'
    );
    expect(notificationTimeLabel?.textContent?.trim()).toBe(dateTimeValue);
  });
  it('should render heading as "title" slot', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    await elementUpdated(notification);
    const titleSlot = notification.shadowRoot?.querySelector(
      'slot[name="title"]'
    ) as HTMLSlotElement;
    expect(titleSlot).toBeDefined();
    const assignedElements = titleSlot!.assignedElements({
      flatten: true,
    });
    const titleElement = assignedElements[0] as HTMLElement;
    expect(titleElement.tagName).toBe('H4');
    expect(
      titleElement.classList.contains('c4p--notifications-panel__notification')
    ).toBe(true);
    expect(titleElement.getAttribute('slot')).toBe('title');
    expect(titleElement.textContent?.trim()).toBe('LogDNA cannot be reached.');
  });
  it('should render description as "description" slot', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    await elementUpdated(notification);
    const descriptionSlot = notification.shadowRoot?.querySelector(
      'slot[name="description"]'
    ) as HTMLSlotElement;
    expect(descriptionSlot).toBeDefined();
    const assignedElements = descriptionSlot!.assignedElements({
      flatten: true,
    });
    const descriptionElement = assignedElements[0] as HTMLElement;
    expect(descriptionElement.tagName).toBe('DIV');
    expect(descriptionElement.getAttribute('slot')).toBe('description');
    expect(descriptionElement.textContent?.trim()).toBe(
      'Unable to communicate with LogDNA.'
    );
  });
  it('should emit "c4p-notification-dismiss" when clicked on single dismiss button', async () => {
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    const eventPromise = oneEvent(notification, 'c4p-notification-dismiss');
    const singleDismissButton = notification.shadowRoot?.querySelector(
      '.c4p--notifications-panel__notification__dismiss-single-button'
    ) as HTMLElement;
    singleDismissButton?.click();
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
  it('triggers click() on Enter key', async () => {
    let clickCalled = false;
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    notification.click = () => {
      clickCalled = true;
    }; // Mock click()

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    //@ts-ignore
    notification._handleKeyDown(enterEvent);

    expect(clickCalled).to.be.true;
  });

  it('triggers click() on Space key', async () => {
    let clickCalled = false;
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    notification.click = () => {
      clickCalled = true;
    }; // Mock click()

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    //@ts-ignore
    notification._handleKeyDown(spaceEvent);

    expect(clickCalled).to.be.true;
  });

  it('does nothing for other keys', async () => {
    let clickCalled = false;
    const notification = (await fixture(
      templateNotification()
    )) as CDSNotification;
    notification.click = () => {
      clickCalled = true;
    };

    const otherKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    //@ts-ignore
    notification._handleKeyDown(otherKeyEvent);
    expect(clickCalled).to.be.false;
  });
});
