/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2154-8478&mode=design&t=0hF8pirV0i9mofd1-4',
  {
    props: {
      title: figma.string('Title text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      open: figma.boolean('Expanded'),
      content: figma.string('Content text'),
      children: figma.instance('Swap slot'),
    },
    example: ({ title, disabled, open, content, children }) =>
      html` <cds-accordion-item
        title=${title}
        disabled=${disabled}
        open=${open}>
        <p>${content}</p>
        ${children}
      </cds-accordion-item>`,
    imports: [
      "import '@carbon/web-components/es/components/accordion/accordion-item.js'",
    ],
  }
);
