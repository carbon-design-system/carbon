/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=57561-3508&t=SB9qULZbn3FRopvU-4',
  {
    props: {
      title: figma.string('AI title'),
      description: figma.string('AI description'),
      slotOne: figma.boolean('Slot 1', {
        true: figma.instance('Swap slot 1'),
        false: '',
      }),
      slotTwo: figma.boolean('Slot 2', {
        true: figma.instance('Swap slot 2'),
      }),
      slotThree: figma.boolean('Slot 3', {
        true: figma.instance('Swap slot 3'),
      }),
      slotFour: figma.boolean('Slot 4', {
        true: figma.instance('Swap slot 4'),
      }),
      actions: figma.children(['Actions footer']),
    },
    example: (props) =>
      html`<cds-ai-label autoalign>
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">${props.title}</h2>
          <p class="secondary">${props.description}</p>
          ${props.slotOne}
          <hr />
          ${props.slotTwo}
          <p class="secondary">
            This is sample placeholder content, replace with your own content
            and custom styles.
          </p>
          ${props.slotThree} ${props.slotFour}
        </div>
        ${props.actions}
      </cds-ai-label>`,
    imports: [
      "import '@carbon/web-components/es/components/ai-label/index.js'",
    ],
  }
);
