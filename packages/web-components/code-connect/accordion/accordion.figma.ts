/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=2490-17019&mode=design&t=0hF8pirV0i9mofd1-4',
  {
    props: {
      children: figma.children(['Accordion item']),
      accordionItem: figma.nestedProps('Accordion item', {
        align: figma.enum('Alignment', {
          Left: 'start',
        }),
        isFlush: figma.boolean('Flush'),
        size: figma.enum('Size', {
          Large: 'lg',
          Medium: 'md',
          Small: 'sm',
        }),
      }),
    },
    example: ({ children, accordionItem }) =>
      html`<cds-accordion
        size=${accordionItem.size}
        alignment=${accordionItem.align}
        isFlush=${accordionItem.isFlush}
        >${children}
      </cds-accordion> `,
    imports: [
      "import '@carbon/web-components/es/components/accordion/accordion.js'",
      "import '@carbon/web-components/es/components/accordion/accordion-item.js'",
    ],
  }
);
