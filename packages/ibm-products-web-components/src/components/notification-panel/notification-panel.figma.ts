/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  title: figma.nestedProps('Header', {
    text: figma.textContent('"Notifications"'),
  }),
  doNotDisturbLabel: figma.nestedProps('Toggle', {
    text: figma.textContent('Value'),
  }),
};

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf?node-id=10574%3A240266',
  {
    variant: { 'Empty state': false },
    props: {
      ...sharedProps,
    },

    example: (props) =>
      html`<c4p-notification-panel
        open
        title-text="${props.title.text}"
        today-text="Today"
        previous-text="Previous"
        dismiss-all-label="Dismiss all"
        donot-disturb-label="${props.doNotDisturbLabel.text}"
        date-time-locale="en-US"
      >
        <c4p-notification
          slot="previous"
          type="success"
          unread="true"
          .timestamp="Time stamp [00:00:00]"
        >
          <h4 slot="title">Title</h4>
          <div slot="description">Message</div>
        </c4p-notification>

        <c4p-notification
          slot="previous"
          type="error"
          unread="false"
          .timestamp="Time stamp [00:00:00]"
        >
          <h4 slot="title">Title</h4>
          <div slot="description">Message</div>
        </c4p-notification>

        <c4p-notification
          slot="previous"
          type="warning"
          unread="false"
          .timestamp="Time stamp [00:00:00]"
        >
          <h4 slot="title">Title</h4>
          <div slot="description">Message</div>
        </c4p-notification>

        <c4p-notification-footer
          slot="footer"
          view-all-label="View all (16)"
        ></c4p-notification-footer>
      </c4p-notification-panel>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/notification-panel/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf?node-id=10574%3A240266',
  {
    variant: { 'Empty state': true },
    props: {
      ...sharedProps,
      emptyStateLabel: figma.nestedProps(
        'Empty state | (v11) Carbon for IBM Products',
        {
          text: figma.string('Title text'),
        }
      ),
    },

    example: (props) =>
      html`<c4p-notification-panel
        open
        title-text="${props.title.text}"
        dismiss-all-label="Dismiss all"
        donot-disturb-label="${props.doNotDisturbLabel.text}"
        empty-state-label="${props.emptyStateLabel.text}"
      >
      </c4p-notification-panel>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/notification-panel/index.js'",
    ],
  }
);
