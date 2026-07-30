/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Tooltip: 'True' },
    props: {
      codeSnippet: figma.nestedProps('Code snippet', {
        text: figma.textContent('node -v'),
      }),
      tooltip: figma.nestedProps('Tooltip content', {
        text: figma.textContent('Tooltip text'),
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-code-snippet
        disabled=${props.disabled}
        feedback=${props.tooltip.text}
        tooltip-content="Copy to clipboard"
        type="inline">
        ${props.codeSnippet.text}
      </cds-code-snippet>`,
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Tooltip: 'False' },
    props: {
      codeSnippet: figma.nestedProps('Code snippet', {
        text: figma.textContent('node -v'),
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-code-snippet
        disabled=${props.disabled}
        feedback="Copied to clipboard"
        tooltip-content="Copy to clipboard"
        type="inline">
        ${props.codeSnippet.text}
      </cds-code-snippet>`,
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-103999&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      children: figma.textContent('$ npm install --save carbon-components'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-code-snippet
        disabled=${props.disabled}
        feedback="Copied to clipboard"
        tooltip-content="Copy to clipboard"
        type="single">
        ${props.children}
      </cds-code-snippet>`,
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      hideCopyButton: figma.boolean('Copy', {
        true: false,
        false: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-code-snippet
        disabled=${props.disabled}
        feedback="Copied to clipboard"
        hide-copy-button=${props.hideCopyButton}
        show-less-text="Show less"
        show-more-text="Show more"
        tooltip-content="Copy to clipboard"
        type="multi">
        Code sample here
      </cds-code-snippet>`,
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-code-snippet-skeleton
        type="multi"></cds-code-snippet-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/code-snippet/index.js'",
    ],
  }
);
