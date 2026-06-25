/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=10574-240216',
  {
    variant: { State: 'Enabled' },
    props: {
      type: figma.nestedProps('Status icon', {
        value: figma.enum('Status', {
          Normal: 'Success',
          Information: 'informational',
          Failure: 'error',
          'Warning yellow': 'warning',
        }),
      }),
      timestamp: figma.boolean('Time stamp', {
        true: figma.string('Time stamp text'),
        false: '',
      }),
      titleText: figma.boolean('Title', {
        true: figma.string('Title text'),
        false: '',
      }),
      messageText: figma.boolean('Message', {
        true: figma.string('Message text'),
        false: '',
      }),
    },

    example: (props) =>
      html`<c4p-notification
        type=${props.type.value}
        timestamp=${props.timestamp}
      >
        <h4 slot="title">${props.titleText}</h4>
        <div slot="description">${props.messageText}</div>
      </c4p-notification>`,
  }
);
