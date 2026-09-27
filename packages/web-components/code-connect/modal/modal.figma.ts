/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4080-55366&t=kgHdN1kQbk04e5Jv-4',
  {
    props: {
      title: figma.string('Title text'),
      label: figma.boolean('Label', {
        true: figma.string('Label text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
      }),
      progress: figma.boolean('Progress', {
        true: figma.children('Progress indicator'),
      }),
      descriptionText: figma.boolean('Description', {
        true: figma.string('Description text'),
      }),
      children: figma.instance('Swap slot'),
      modalFooter: figma.boolean('Actions', {
        true: figma.children('Actions'),
      }),
    },
    example: (props) =>
      html`<cds-modal open size=${props.size}>
        <cds-modal-header>
          <cds-modal-close-button></cds-modal-close-button>
          <cds-modal-label>${props.label}</cds-modal-label>
          <cds-modal-heading>${props.title}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          ${props.progress}
          <cds-modal-body-content description>
            ${props.descriptionText}
          </cds-modal-body-content>
          ${props.children}
        </cds-modal-body>
        ${props.modalFooter}
      </cds-modal>`,
    imports: ["import '@carbon/web-components/es/components/modal/index.js'"],
  }
);
