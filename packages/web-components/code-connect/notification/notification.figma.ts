/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedNotificationProps = {
  title: figma.string('Title text'),
  subtitle: figma.string('Message text'),
  kind: figma.enum('Status', {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  }),
  hideCloseButton: figma.boolean('Close', {
    true: false,
    false: true,
  }),
  lowContrast: figma.boolean('High contrast', {
    true: false,
    false: true,
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=4179-105911&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'False' },
    props: sharedNotificationProps,
    example: (props) =>
      html`<cds-inline-notification
        hide-close-button=${props.hideCloseButton}
        kind=${props.kind}
        low-contrast=${props.lowContrast}
        subtitle=${props.subtitle}
        title=${props.title}></cds-inline-notification>`,
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=4179-105911&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'True' },
    props: sharedNotificationProps,
    example: (props) =>
      html`<cds-actionable-notification
        hide-close-button=${props.hideCloseButton}
        inline
        kind=${props.kind}
        low-contrast=${props.lowContrast}
        subtitle=${props.subtitle}
        title=${props.title}>
        <cds-actionable-notification-button slot="action">
          Action
        </cds-actionable-notification-button>
      </cds-actionable-notification>`,
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=84336-35011&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'False' },
    props: {
      ...sharedNotificationProps,
      caption: figma.string('Time text'),
    },
    example: (props) =>
      html`<cds-toast-notification
        caption=${props.caption}
        hide-close-button=${props.hideCloseButton}
        kind=${props.kind}
        low-contrast=${props.lowContrast}
        subtitle=${props.subtitle}
        title=${props.title}></cds-toast-notification>`,
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=84336-35011&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'True' },
    props: sharedNotificationProps,
    example: (props) =>
      html`<cds-actionable-notification
        hide-close-button=${props.hideCloseButton}
        kind=${props.kind}
        low-contrast=${props.lowContrast}
        subtitle=${props.subtitle}
        title=${props.title}>
        <cds-actionable-notification-button slot="action">
          Action
        </cds-actionable-notification-button>
      </cds-actionable-notification>`,
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=84336-36580&t=nJ89fkK549fgCUuf-4',
  {
    props: {
      title: figma.boolean('Title', {
        true: figma.string('Title text'),
        false: '',
      }),
      subtitle: figma.string('Message text'),
      kind: figma.enum('Status', {
        Info: 'info',
        Warning: 'warning',
      }),
      lowContrast: figma.boolean('High contrast', {
        true: false,
        false: true,
      }),
    },
    example: (props) =>
      html`<cds-callout-notification
        kind=${props.kind}
        low-contrast=${props.lowContrast}
        subtitle=${props.subtitle}
        title=${props.title}></cds-callout-notification>`,
    imports: [
      "import '@carbon/web-components/es/components/notification/index.js'",
    ],
  }
);
