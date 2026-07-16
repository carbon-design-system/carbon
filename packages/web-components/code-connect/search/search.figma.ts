/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedSearchProps = {
  size: figma.enum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),
  placeholder: figma.string('Placeholder text'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    variant: { Expandable: 'False' },
    props: sharedSearchProps,
    example: (props) =>
      html`<cds-search
        disabled=${props.disabled}
        placeholder=${props.placeholder}
        size=${props.size}></cds-search>`,
    imports: ["import '@carbon/web-components/es/components/search/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    variant: { Expandable: 'True' },
    props: sharedSearchProps,
    example: (props) =>
      html`<cds-search
        disabled=${props.disabled}
        expandable
        placeholder=${props.placeholder}
        size=${props.size}></cds-search>`,
    imports: ["import '@carbon/web-components/es/components/search/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2805-21056&t=6KMXKibN414b97hv-4',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-search-skeleton></cds-search-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/search/index.js'"],
  }
);
