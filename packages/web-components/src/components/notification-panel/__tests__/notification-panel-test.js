/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  fixture,
  html,
  oneEvent,
  expect,
  elementUpdated,
} from '@open-wc/testing';
import '@carbon/web-components/es/components/notification-panel/index.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';
import CDSNotificationPanel from '@carbon/web-components/es/components/notification-panel/notification-panel.js';
import CDSNotification from '@carbon/web-components/es/components/notification-panel/notification.js';
import CDSNotificationFooter from '@carbon/web-components/es/components/notification-panel/notification-footer.js';

const blockClass = `${prefix}--notifications-panel`;
const blockClassNotification = `${prefix}--notifications-panel__notification`;

// ─── helpers ────────────────────────────────────────────────────────────────

function getTimestamp() {
  return new Date(Date.now() - 30 * 1000);
}

const panelTemplate = (props = {}) => {
  const {
    open = true,
    titleText = 'Notifications',
    todayText = 'Today',
    previousText = 'Previous',
    dismissAllLabel = 'Dismiss all',
    emptyStateLabel = 'No notifications',
    doNotDisturbLabel = 'Do not disturb',
  } = props;
  const timestamp = getTimestamp();
  return html`
    <cds-notification-panel
      ?open=${open}
      title-text=${titleText}
      today-text=${todayText}
      previous-text=${previousText}
      dismiss-all-label=${dismissAllLabel}
      empty-state-label=${emptyStateLabel}
      donot-disturb-label=${doNotDisturbLabel}>
      <cds-notification slot="today" type="error" .timestamp=${timestamp}>
        <h4 class="${blockClassNotification}-title" slot="title">
          Notification title
        </h4>
        <div slot="description">Notification description</div>
      </cds-notification>
      <cds-notification slot="previous" type="success" .timestamp=${timestamp}>
        <h4 class="${blockClassNotification}-title" slot="title">
          Previous notification
        </h4>
        <div slot="description">Previous description</div>
      </cds-notification>
      <cds-notification slot="previous" type="warning" .timestamp=${timestamp}>
        <h4 class="${blockClassNotification}-title" slot="title">
          Another previous
        </h4>
        <div slot="description">Another description</div>
      </cds-notification>
      <cds-notification-footer
        slot="footer"
        view-all-label="View all (3)"></cds-notification-footer>
    </cds-notification-panel>
  `;
};

const emptyPanelTemplate = () => html`
  <cds-notification-panel
    ?open=${true}
    title-text="Notifications"
    dismiss-all-label="Dismiss all"
    donot-disturb-label="Do not disturb"
    empty-state-label="No notifications yet"></cds-notification-panel>
`;

// ─── cds-notification-panel ─────────────────────────────────────────────────

describe('cds-notification-panel', () => {
  it('renders', async () => {
    const el = await fixture(panelTemplate());
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-notification-panel');
  });

  it('reflects open attribute to property', async () => {
    const el = await fixture(
      html`<cds-notification-panel ?open=${true}></cds-notification-panel>`
    );
    expect(el.open).to.be.true;
  });

  it('reflects string attributes to properties', async () => {
    const el = await fixture(html`
      <cds-notification-panel
        title-text="My Notifications"
        today-text="Today"
        previous-text="Previous"
        dismiss-all-label="Dismiss all"
        empty-state-label="None"
        donot-disturb-label="DND"></cds-notification-panel>
    `);
    expect(el.titleText).to.equal('My Notifications');
    expect(el.todayText).to.equal('Today');
    expect(el.previousText).to.equal('Previous');
    expect(el.dismissAllLabel).to.equal('Dismiss all');
    expect(el.emptyStateLabel).to.equal('None');
    expect(el.doNotDisturbLabel).to.equal('DND');
  });

  it('renders the title inside the header', async () => {
    const el = await fixture(panelTemplate({ titleText: 'My Panel' }));
    await el.updateComplete;
    const header = el.shadowRoot?.querySelector(`.${blockClass}__header`);
    expect(header).to.exist;
    expect(header.textContent.trim()).to.equal('My Panel');
  });

  it('renders dismiss-all button with the correct label', async () => {
    const el = await fixture(panelTemplate({ dismissAllLabel: 'Clear all' }));
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__dismiss-button`);
    expect(btn).to.exist;
    expect(btn.textContent.trim()).to.equal('Clear all');
  });

  it('renders today section label when today slot has content', async () => {
    const el = await fixture(panelTemplate({ todayText: 'Today' }));
    await el.updateComplete;
    const label = el.shadowRoot?.querySelector(
      `.${blockClass}__time-section-label--today`
    );
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Today');
  });

  it('renders previous section label when previous slot has content', async () => {
    const el = await fixture(panelTemplate({ previousText: 'Earlier' }));
    await el.updateComplete;
    const label = el.shadowRoot?.querySelector(
      `.${blockClass}__time-section-label--previous`
    );
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Earlier');
  });

  it('renders the footer slot when there are notifications', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const footerContainer = el.shadowRoot?.querySelector(
      `.${blockClass}__bottom-actions-container`
    );
    expect(footerContainer).to.exist;
  });

  it('renders empty-state slot when no notifications are slotted', async () => {
    const el = await fixture(emptyPanelTemplate());
    await el.updateComplete;
    const emptySlot = el.shadowRoot?.querySelector('slot[name="empty-state"]');
    expect(emptySlot).to.exist;
  });

  it('does not render today/previous labels when panel is empty', async () => {
    const el = await fixture(emptyPanelTemplate());
    await el.updateComplete;
    const todayLabel = el.shadowRoot?.querySelector(
      `.${blockClass}__time-section-label--today`
    );
    const previousLabel = el.shadowRoot?.querySelector(
      `.${blockClass}__time-section-label--previous`
    );
    expect(todayLabel).to.be.null;
    expect(previousLabel).to.be.null;
  });

  it('assigns today-slotted notifications to the today slot', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const todaySlot = el.shadowRoot?.querySelector('slot[name="today"]');
    expect(todaySlot).to.exist;
    const assigned = todaySlot.assignedElements({ flatten: true });
    expect(assigned.length).to.be.greaterThan(0);
    expect(assigned[0].tagName.toLowerCase()).to.equal('cds-notification');
  });

  it('assigns previous-slotted notifications to the previous slot', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const previousSlot = el.shadowRoot?.querySelector('slot[name="previous"]');
    expect(previousSlot).to.exist;
    const assigned = previousSlot.assignedElements({ flatten: true });
    expect(assigned.length).to.be.greaterThan(0);
    expect(
      assigned.every((n) => n.tagName.toLowerCase() === 'cds-notification')
    ).to.be.true;
  });

  it('assigns the footer to the footer slot', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const footerSlot = el.shadowRoot?.querySelector('slot[name="footer"]');
    expect(footerSlot).to.exist;
    const assigned = footerSlot.assignedElements({ flatten: true });
    expect(assigned[0].tagName.toLowerCase()).to.equal(
      'cds-notification-footer'
    );
  });

  it('emits cds-notification-dismiss-all when dismiss button is clicked', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__dismiss-button`);
    const eventPromise = oneEvent(el, 'cds-notification-dismiss-all');
    btn.click();
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('emits cds-notification-click-outside when Escape is pressed', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const eventPromise = oneEvent(el, 'cds-notification-click-outside');
    el.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('sets open to false when Escape is pressed', async () => {
    const el = await fixture(panelTemplate({ open: true }));
    await el.updateComplete;
    el.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('emits cds-notification-click-outside when clicking outside the panel', async () => {
    const wrapper = await fixture(html`
      <div>
        ${panelTemplate()}
        <div id="outside"></div>
      </div>
    `);
    const el = wrapper.querySelector('cds-notification-panel');
    await el.updateComplete;
    const eventPromise = oneEvent(el, 'cds-notification-click-outside');
    wrapper.querySelector('#outside').click();
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('emits cds-notification-donot-disturb-change when the toggle fires', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const toggle = el.shadowRoot?.querySelector(
      `.${blockClass}__do-not-disturb-toggle`
    );
    const eventPromise = oneEvent(el, 'cds-notification-donot-disturb-change');
    toggle.dispatchEvent(
      new CustomEvent('cds-toggle-changed', {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('adds --next class to next sibling on focusin', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const notifications = el.querySelectorAll(
      'cds-notification[slot="previous"]'
    );
    const first = notifications[0];
    const second = notifications[1];
    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await elementUpdated(el);
    expect(second.classList.contains(`${blockClass}__notification--next`)).to.be
      .true;
  });

  it('removes --next class from next sibling on focusout', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const notifications = el.querySelectorAll(
      'cds-notification[slot="previous"]'
    );
    const first = notifications[0];
    const second = notifications[1];
    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await elementUpdated(el);
    first.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await elementUpdated(el);
    expect(second.classList.contains(`${blockClass}__notification--next`)).to.be
      .false;
  });

  it('marks only the first notification with first-notification class', async () => {
    const el = await fixture(panelTemplate());
    await el.updateComplete;
    const notifications = el.querySelectorAll('cds-notification');
    expect(notifications[0].classList.contains('first-notification')).to.be
      .true;
    for (let i = 1; i < notifications.length; i++) {
      expect(notifications[i].classList.contains('first-notification')).to.be
        .false;
    }
  });
});

// ─── cds-notification ────────────────────────────────────────────────────────

describe('cds-notification', () => {
  it('renders', async () => {
    const el = await fixture(html`
      <cds-notification type="error" .timestamp=${getTimestamp()}>
        <h4 slot="title">Title</h4>
        <div slot="description">Description</div>
      </cds-notification>
    `);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-notification');
  });

  it('reflects type attribute to property', async () => {
    const el = await fixture(
      html`<cds-notification type="success"></cds-notification>`
    );
    expect(el.type).to.equal('success');
  });

  it('renders the error status icon for type=error', async () => {
    const el = await fixture(html`
      <cds-notification
        type="error"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const icon = el.shadowRoot?.querySelector(
      `.${blockClassNotification}-status-icon-error`
    );
    expect(icon).to.exist;
  });

  it('renders the success status icon for type=success', async () => {
    const el = await fixture(html`
      <cds-notification
        type="success"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const icon = el.shadowRoot?.querySelector(
      `.${blockClassNotification}-status-icon-success`
    );
    expect(icon).to.exist;
  });

  it('renders the warning status icon for type=warning', async () => {
    const el = await fixture(html`
      <cds-notification
        type="warning"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const icon = el.shadowRoot?.querySelector(
      `.${blockClassNotification}-status-icon-warning`
    );
    expect(icon).to.exist;
  });

  it('renders the informational status icon for type=informational', async () => {
    const el = await fixture(html`
      <cds-notification
        type="informational"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const icon = el.shadowRoot?.querySelector(
      `.${blockClassNotification}-status-icon-informational`
    );
    expect(icon).to.exist;
  });

  it('renders a time label when a timestamp is provided', async () => {
    const el = await fixture(html`
      <cds-notification
        type="error"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const timeLabel = el.shadowRoot?.querySelector(
      `.${blockClassNotification}-time-label`
    );
    expect(timeLabel).to.exist;
    expect(timeLabel.textContent.trim().length).to.be.greaterThan(0);
  });

  it('renders the title slot', async () => {
    const el = await fixture(html`
      <cds-notification type="error" .timestamp=${getTimestamp()}>
        <h4 slot="title">My Title</h4>
      </cds-notification>
    `);
    await el.updateComplete;
    const titleSlot = el.shadowRoot?.querySelector('slot[name="title"]');
    expect(titleSlot).to.exist;
    const assigned = titleSlot.assignedElements({ flatten: true });
    expect(assigned[0].textContent.trim()).to.equal('My Title');
  });

  it('renders the description slot', async () => {
    const el = await fixture(html`
      <cds-notification type="error" .timestamp=${getTimestamp()}>
        <div slot="description">My Description</div>
      </cds-notification>
    `);
    await el.updateComplete;
    const descSlot = el.shadowRoot?.querySelector('slot[name="description"]');
    expect(descSlot).to.exist;
    const assigned = descSlot.assignedElements({ flatten: true });
    expect(assigned[0].textContent.trim()).to.equal('My Description');
  });

  it('emits cds-notification-dismiss when dismiss button is clicked', async () => {
    const el = await fixture(html`
      <cds-notification
        type="error"
        .timestamp=${getTimestamp()}></cds-notification>
    `);
    await el.updateComplete;
    const dismissBtn = el.shadowRoot?.querySelector(
      `.${blockClassNotification}__dismiss-single-button`
    );
    expect(dismissBtn).to.exist;
    const eventPromise = oneEvent(el, 'cds-notification-dismiss');
    dismissBtn.click();
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('sets role=button and tabindex=0 on connectedCallback', async () => {
    const el = await fixture(html`<cds-notification></cds-notification>`);
    expect(el.getAttribute('role')).to.equal('button');
    expect(el.getAttribute('tabindex')).to.equal('0');
  });

  it('calls click() when Enter key is pressed', async () => {
    const el = await fixture(html`<cds-notification></cds-notification>`);
    let clicked = false;
    el.click = () => {
      clicked = true;
    };
    el._handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(clicked).to.be.true;
  });

  it('calls click() when Space key is pressed', async () => {
    const el = await fixture(html`<cds-notification></cds-notification>`);
    let clicked = false;
    el.click = () => {
      clicked = true;
    };
    el._handleKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
    expect(clicked).to.be.true;
  });

  it('does not call click() for other keys', async () => {
    const el = await fixture(html`<cds-notification></cds-notification>`);
    let clicked = false;
    el.click = () => {
      clicked = true;
    };
    el._handleKeyDown(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(clicked).to.be.false;
  });
});

// ─── cds-notification-footer ─────────────────────────────────────────────────

describe('cds-notification-footer', () => {
  it('renders', async () => {
    const el = await fixture(
      html`<cds-notification-footer></cds-notification-footer>`
    );
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-notification-footer');
  });

  it('reflects view-all-label attribute to property', async () => {
    const el = await fixture(html`
      <cds-notification-footer
        view-all-label="View all (5)"></cds-notification-footer>
    `);
    expect(el.viewAllLabel).to.equal('View all (5)');
  });

  it('renders the view-all button with the correct label', async () => {
    const el = await fixture(html`
      <cds-notification-footer
        view-all-label="See all"></cds-notification-footer>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__view-all-button`);
    expect(btn).to.exist;
    expect(btn.textContent.trim()).to.equal('See all');
  });

  it('renders the settings button', async () => {
    const el = await fixture(
      html`<cds-notification-footer></cds-notification-footer>`
    );
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__settings-button`);
    expect(btn).to.exist;
  });

  it('emits cds-notification-view-all when view-all button is clicked', async () => {
    const el = await fixture(html`
      <cds-notification-footer
        view-all-label="View all"></cds-notification-footer>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__view-all-button`);
    const eventPromise = oneEvent(el, 'cds-notification-view-all');
    btn.click();
    const event = await eventPromise;
    expect(event).to.exist;
  });

  it('emits cds-notification-settings when settings button is clicked', async () => {
    const el = await fixture(
      html`<cds-notification-footer></cds-notification-footer>`
    );
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(`.${blockClass}__settings-button`);
    const eventPromise = oneEvent(el, 'cds-notification-settings');
    btn.click();
    const event = await eventPromise;
    expect(event).to.exist;
  });
});
