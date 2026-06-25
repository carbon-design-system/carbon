/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16728-642118',
  {
    props: {
      label: figma.boolean('Clickable', {
        true: figma.nestedProps('Link', {
          text: figma.textContent('Link'),
        }),
        false: {
          text: 'Task name',
        },
      }),
      status: figma.enum('State', {
        Unchecked: 'not started',
        'In progress': 'in progress',
        Completed: 'completed',
      }),
      clickable: figma.boolean('Clickable'),
    },
    example: ({ label, status, clickable }) =>
      html`<c4p-checklist-item
        label=${label.text}
        status=${status}
        clickable=${clickable}
      ></c4p-checklist-item>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/checklist/checklist-item.js'",
    ],
  }
);
