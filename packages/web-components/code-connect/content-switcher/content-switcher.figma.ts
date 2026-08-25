/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402486&t=LoXqbMLZkoMgbrAS-4',
  {
    props: {
      children: figma.children(['_Content switcher text item']),
      lowContrast: figma.boolean('Low contrast'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-content-switcher
        low-contrast=${props.lowContrast}
        selected-index="0"
        size=${props.size}>
        ${props.children}
      </cds-content-switcher>`,
    imports: [
      "import '@carbon/web-components/es/components/content-switcher/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402486&t=LoXqbMLZkoMgbrAS-4',
  {
    variant: { Type: 'Icon only' },
    props: {
      children: figma.children(['_Content switcher icon item']),
      lowContrast: figma.boolean('Low contrast'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-content-switcher
        low-contrast=${props.lowContrast}
        selected-index="0"
        size=${props.size}>
        ${props.children}
      </cds-content-switcher>`,
    imports: [
      "import '@carbon/web-components/es/components/content-switcher/index.js'",
    ],
  }
);
