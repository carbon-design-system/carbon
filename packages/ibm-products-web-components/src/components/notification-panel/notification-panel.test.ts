/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, vi } from 'vitest';
import { html, fixture, oneEvent, elementUpdated } from '@open-wc/testing';
import './index';
import { carbonPrefix } from '../../globals/settings';
import CDSNotificationPanel from './notification-panel';

const defaultProps = {
  class: 'custom-class',
  titleText: 'Notifications',
  dismissAllLabel: 'Dismiss all',
  doNotDisturbLabel: 'Do not disturb',
  todayText: 'Today',
  previousText: 'previous',
  open: true,
  dateTimeLocale: 'en-US',
};

const template = (props: any = defaultProps) => {
  const timeStamp = new Date(new Date().getTime() - 30 * 1000);
  return html`
    <c4p-notification-panel
      ?open=${props.open}
      title-text=${props.titleText}
      dismiss-all-label=${props.dismissAllLabel}
      donot-disturb-label=${props.doNotDisturbLabel}
      today-text=${props.todayText}
      previous-text=${props.previousText}
      date-time-locale="${props.dateTimeLocale}"
    >
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
      <c4p-notification
        slot="previous"
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
      <c4p-notification
        slot="previous"
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
    </c4p-notification-panel>
  `;
};

describe('c4p-notification-panel', () => {
  it('should render the notification panel', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    expect(panel?.open).toBeTruthy();
    expect(panel).toBeDefined();
  });
  it('should have focus on Dismiss all button after render', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const dismissButton = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__dismiss-button'
    );
    expect(panel.shadowRoot?.activeElement).toBe(dismissButton);
  });
  it('should have titleText rendered inside the panel header', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const panelHeading = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__header'
    );
    expect(panelHeading?.textContent?.trim()).toBe(panel.titleText);
  });
  it('should have "dismissAllLabel" prop passed be the label for the dismiss all button', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const dismissButton = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__dismiss-button'
    );
    expect(dismissButton?.textContent?.trim()).toBe(panel.dismissAllLabel);
  });
  it('should have "doNotDisturbLabel" prop passed be the label for the Do not disturb toggle', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const doNotDisturbToggle = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__do-not-disturb-toggle'
    );
    const toggleText = doNotDisturbToggle?.shadowRoot?.querySelector(
      `.${carbonPrefix}--toggle__text`
    );
    expect(toggleText?.textContent?.trim()).toBe(panel.doNotDisturbLabel);
  });
  it('should have "todayText" prop passed be title for Today Section', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const todayTitle = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__time-section-label--today'
    );
    expect(todayTitle?.textContent?.trim()).toBe(panel.todayText);
  });
  it('should have "previousText" prop passed be title for Previous Section', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const previousTitle = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__time-section-label--previous'
    );
    expect(previousTitle?.textContent?.trim()).toBe(panel.previousText);
  });
  it('should emit "c4p-notification-click-outside" when clicking outside the panel', async () => {
    const element = await fixture(html`
      <div>
        ${template()}
        <div id="outside"></div>
      </div>
    `);
    const panel = element.querySelector('c4p-notification-panel')!;
    const eventPromise = oneEvent(panel, 'c4p-notification-click-outside');
    const outsideDiv = element.querySelector('#outside') as HTMLElement;
    outsideDiv.click();
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
  it('should emit "c4p-notification-click-outside" when pressing Escape', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    await elementUpdated(panel);
    const eventPromise = oneEvent(panel, 'c4p-notification-click-outside');
    panel.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
  it('should emit "c4p-notification-dismiss-all" when clicked on dismiss all button', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const eventPromise = oneEvent(panel, 'c4p-notification-dismiss-all');
    const dismissButton = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__dismiss-button'
    ) as HTMLElement;
    dismissButton?.click();
    const event = await eventPromise;
    expect(event).toBeDefined();
  });
  it('should emit "c4p-notification-donot-disturb-change" when clicked on Do not disturb toggle', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    const eventPromise = oneEvent(
      panel,
      'c4p-notification-donot-disturb-change'
    );
    const doNotDisturbToggle = panel.shadowRoot?.querySelector(
      '.c4p--notifications-panel__do-not-disturb-toggle'
    ) as HTMLElement;
    doNotDisturbToggle?.dispatchEvent(
      new CustomEvent('cds-toggle-changed', {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
    const event = await eventPromise;
    expect(event).toBeDefined();
  });

  it('should render c4p-notification inside the "today" slot', async () => {
    const panel = (await fixture(template())) as HTMLElement;
    await elementUpdated(panel);
    const todaySlot = panel.shadowRoot?.querySelector(
      'slot[name="today"]'
    ) as HTMLSlotElement;
    expect(todaySlot).toBeDefined();
    const assignedElements = todaySlot!.assignedElements({ flatten: true });
    expect(assignedElements[0].tagName.toLowerCase()).toBe('c4p-notification');
  });
  it('should render c4p-notification inside the "previous" slot', async () => {
    const panel = (await fixture(template())) as HTMLElement;
    await elementUpdated(panel);
    const previousSlot = panel.shadowRoot?.querySelector(
      'slot[name="previous"]'
    ) as HTMLSlotElement;
    expect(previousSlot).toBeDefined();
    const assignedElements = previousSlot!.assignedElements({
      flatten: true,
    });
    const isNotifications = assignedElements.every(
      (el) => el.tagName.toLowerCase() === 'c4p-notification'
    );
    expect(isNotifications).toBe(true);
    expect(assignedElements.length).toBeGreaterThan(0);
  });
  it('should render c4p-notification-footer inside the "footer" slot', async () => {
    const panel = (await fixture(template())) as HTMLElement;
    const footerSlot = panel.shadowRoot?.querySelector(
      'slot[name="footer"]'
    ) as HTMLSlotElement;
    expect(footerSlot).toBeDefined();
    const assignedElements = footerSlot!.assignedElements({
      flatten: true,
    });
    expect(assignedElements[0].tagName.toLowerCase()).toBe(
      'c4p-notification-footer'
    );
  });
  it('should update _providedLocale when dateTimeLocale changes', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    panel.dateTimeLocale = 'fr-FR';
    await panel.updateComplete;
    // @ts-ignore
    expect(panel._providedLocale).to.equal('fr-FR');
  });
  it('should correctly update _hasTodayContent and _hasPreviousContent based on slotted elements', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    await panel.updateComplete;
    // @ts-ignore
    expect(panel._hasTodayContent).to.be.true;
    // @ts-ignore
    expect(panel._hasPreviousContent).to.be.true;
    const previousItem = document.createElement('div');
    previousItem.slot = 'previous';
    previousItem.textContent = 'Previous item';
    panel.appendChild(previousItem);
    await panel.updateComplete;
    // @ts-ignore
    expect(panel._hasTodayContent).to.be.true;
    const todayItem = panel.querySelector('[slot="today"]');
    todayItem?.remove();
    await panel.updateComplete;
    // @ts-ignore
    expect(panel._hasTodayContent).to.be.false;
  });
  it('should disconnect the mutation observer when disconnected', async () => {
    const disconnectSpy = vi.fn();
    const panel = (await fixture(template())) as CDSNotificationPanel;
    // @ts-ignore
    panel._mutationObserver = { disconnect: disconnectSpy };
    panel.remove();
    expect(disconnectSpy).toHaveBeenCalled();
  });
  it('should focus on trigger button when closed by clicking outside on non-actionable element', async () => {
    const element = await fixture(html`
      <div>
        <button id="trigger-button">Trigger</button>
        ${template()}
        <div id="outside"></div>
      </div>
    `);
    const panel = element.querySelector(
      'c4p-notification-panel'
    ) as CDSNotificationPanel;
    const triggerButton = element.querySelector(
      '#trigger-button'
    ) as HTMLElement;
    const outsideDiv = element.querySelector('#outside') as HTMLElement;

    panel.triggerButtonRef = triggerButton;
    outsideDiv.click();

    await elementUpdated(panel);
    expect(document.activeElement).toBe(triggerButton);
  });

  it('should not focus on trigger button when closed by clicking outside on actionable element', async () => {
    const element = await fixture(html`
      <div>
        <button id="trigger-button">Trigger</button>
        ${template()}
        <div id="outside">
          <button id="actionable-button">Actionable</button>
        </div>
      </div>
    `);
    const panel = element.querySelector(
      'c4p-notification-panel'
    ) as CDSNotificationPanel;
    const triggerButton = element.querySelector(
      '#trigger-button'
    ) as HTMLElement;
    const actionableButton = element.querySelector(
      '#actionable-button'
    ) as HTMLButtonElement;
    panel.triggerButtonRef = triggerButton;
    actionableButton.click();
    await elementUpdated(panel);
    expect(document.activeElement).not.toBe(triggerButton);
  });

  it('should render notifications empty state', async () => {
    const props = defaultProps;
    const panel: CDSNotificationPanel = await fixture(
      html` <c4p-notification-panel
        ?open=${props.open}
        title-text=${props.titleText}
        dismiss-all-label=${props.dismissAllLabel}
        donot-disturb-label=${props.doNotDisturbLabel}
        today-text=${props.todayText}
        previous-text=${props.previousText}
        date-time-locale="${props.dateTimeLocale}"
      ></c4p-notification-panel>`
    );

    const slot = panel.shadowRoot?.querySelector(
      `slot[name="empty-state"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
  });

  it('should display the "emptyStateLabel" prop as the label for the empty state message', async () => {
    const props = defaultProps;
    const panel: CDSNotificationPanel = await fixture(
      html` <c4p-notification-panel
        ?open=${props.open}
        title-text=${props.titleText}
        dismiss-all-label=${props.dismissAllLabel}
        empty-state-label="No notifications yet!"
        donot-disturb-label=${props.doNotDisturbLabel}
        today-text=${props.todayText}
        previous-text=${props.previousText}
        date-time-locale="${props.dateTimeLocale}"
      ></c4p-notification-panel>`
    );

    const emptyStateEl = panel.shadowRoot?.querySelector(`clabs-empty-state`);
    expect(emptyStateEl).toBeTruthy();
    expect(emptyStateEl?.getAttribute('subtitle')).to.equal(
      'No notifications yet!'
    );
  });

  it('should render custom empty state component', async () => {
    const props = defaultProps;
    const panel: CDSNotificationPanel = await fixture(
      html` <c4p-notification-panel
        ?open=${props.open}
        title-text=${props.titleText}
        dismiss-all-label=${props.dismissAllLabel}
        empty-state-label="No notifications yet!"
        donot-disturb-label=${props.doNotDisturbLabel}
        today-text=${props.todayText}
        previous-text=${props.previousText}
        date-time-locale="${props.dateTimeLocale}"
      >
        <div slot="empty-state">
          <span class="empty-state-message">empty state message</span>
        </div>
      </c4p-notification-panel>`
    );

    const slot = panel.shadowRoot?.querySelector(
      `slot[name="empty-state"]`
    ) as HTMLSlotElement;

    const node = slot.assignedNodes()[0] as HTMLElement;

    expect(node?.querySelector('.empty-state-message')?.textContent).toBe(
      'empty state message'
    );
  });

  it('should add --next class to next sibling on focusin', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    await elementUpdated(panel);
    const notifications = panel.querySelectorAll(
      'c4p-notification[slot="previous"]'
    );
    const first = notifications[0] as HTMLElement;
    const second = notifications[1] as HTMLElement;

    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await elementUpdated(panel);
    expect(
      second.classList.contains('c4p--notifications-panel__notification--next')
    ).toBe(true);
  });

  it('should remove --next class from next sibling on focusout', async () => {
    const panel = (await fixture(template())) as CDSNotificationPanel;
    await elementUpdated(panel);
    const notifications = panel.querySelectorAll(
      'c4p-notification[slot="previous"]'
    );
    const first = notifications[0] as HTMLElement;
    const second = notifications[1] as HTMLElement;

    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await elementUpdated(panel);
    first.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await elementUpdated(panel);
    expect(
      second.classList.contains('c4p--notifications-panel__notification--next')
    ).toBe(false);
  });
});
