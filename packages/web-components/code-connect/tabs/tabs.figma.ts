/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3890-50605&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      contained: figma.enum('Style', {
        Contained: 'contained',
      }),
      fullWidth: figma.enum('Alignment', {
        'Grid aware': true,
      }),
      children: figma.children(['_Horizontal tabs items']),
      tab: figma.nestedProps('_Horizontal tabs items', {
        size: figma.enum('Size', {
          Large: 'lg',
        }),
        dismissable: figma.boolean('Dismissible', {
          true: true,
          false: figma.boolean('Dismissible + Icon'),
        }),
      }),
    },
    example: (props) =>
      html`<cds-tabs
          aria-label="List of tabs"
          type=${props.contained}
          full-width=${props.fullWidth}
          size=${props.tab.size}
          dismissable=${props.tab.dismissable}>
          ${props.children}
        </cds-tabs>
        <!-- Example code below, not mapped in Figma.
        There needs to be one panel per tab -->
        <div id="panel-1" role="tabpanel">Tab Panel 1</div>
        <div id="panel-2" role="tabpanel">Tab Panel 2</div>
        <div id="panel-3" role="tabpanel">Tab Panel 3</div>
        <div id="panel-4" role="tabpanel">Tab Panel 4</div>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);

// vertical
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75823-2818&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      children: figma.children(['_Vertical tabs items']),
    },
    example: (props) =>
      html`<cds-tabs-vertical>
        <cds-tabs aria-label="List of tabs" slot="tabs"
          >${props.children}</cds-tabs
        >
        <!-- Example code below, not mapped in Figma.
        There needs to be one panel per tab -->
        <div id="panel-1" role="tabpanel">Tab Panel 1</div>
        <div id="panel-2" role="tabpanel">Tab Panel 2</div>
        <div id="panel-3" role="tabpanel">Tab Panel 3</div>
        <div id="panel-4" role="tabpanel">Tab Panel 4</div>
      </cds-tabs-vertical>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);
