/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './options-tile';
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=36228%3A14503',
  {
    props: {
      title: figma.string('Heading text'),
      open: figma.boolean('Expanded'),
      size: figma.enum('Size', {
        Large: 'lg',
        'Extra large': 'xl',
      }),
      toggle: figma.boolean('Toggle', {
        true: '<cds-toggle id="my-toggle" size="sm" hideLabel></cds-toggle>',
        false: undefined,
      }),
      children: figma.enum('Type', {
        Static: undefined,
        Expandable: figma.instance('Swap slot'),
      }),
      summaryProps: figma.boolean('Summary + Validation', {
        true: figma.nestedProps('Summary + Validation message', {
          locked: figma.enum('Type', {
            Summary: figma.boolean('Locked'),
            Warning: false,
            Error: false,
          }),
          summary: figma.enum('Type', {
            Summary: figma.string('Summary text'),
            Warning: undefined,
            Error: undefined,
          }),
          invalid: figma.enum('Type', {
            Summary: undefined,
            Warning: undefined,
            Error: true,
          }),
          invalidText: figma.enum('Type', {
            Summary: undefined,
            Warning: undefined,
            Error: figma.string('Error text'),
          }),
          warn: figma.enum('Type', {
            Summary: undefined,
            Warning: true,
            Error: undefined,
          }),
          warnText: figma.enum('Type', {
            Summary: undefined,
            Warning: figma.string('Warning text'),
            Error: undefined,
          }),
        }),
        false: {
          locked: undefined,
          summary: undefined,
          invalid: undefined,
          invalidText: undefined,
          warn: undefined,
          warnText: undefined,
        },
      }),
    },
    example: (props) => html`
      <c4p-options-tile
        ?defaultOpen="${props.open}"
        size="${props.size}"
        titleText="${props.title}"
      >
        <div slot="summary">${props.summaryProps.summary}</div>
        <div slot="toggle">${props.toggle}</div>
        <div slot="body">${props.children}</div>
      </c4p-options-tile>
    `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/options-tile/index';",
    ],
  }
);
