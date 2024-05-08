/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  InlineNotification,
  // ToastNotification,
  ActionableNotification,
} from '@carbon/react';
import figma from '@figma/code-connect';

const sharedNotificationProps = {
  title: figma.string('Title text'),
  subtitle: figma.string('Message text'),
  caption: figma.string('Time text'), //only used on toast
  kind: figma.enum('Status', {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
    // Figma missing info-square and warning-alt
  }),
  hideCloseButton: figma.boolean('Close', {
    true: false,
    false: true,
  }),
  lowContrast: figma.boolean('High contrast', {
    true: false,
    false: true,
  }),
  actionable: figma.boolean('Actionable'),
};

// this isn't working, perhaps a bug? https://github.com/figma/code-connect/issues/45
figma.connect(
  ActionableNotification,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=WhsTspVnawA9vgXk-4',
  {
    variant: { Actionable: 'True' },
    props: sharedNotificationProps,
    example: ({
      title,
      kind,
      subtitle,
      hideCloseButton,
      actionable,
      lowContrast,
    }) => (
      // Disclaimer: Code Connect is currently in beta and
      // integration with Carbon React is in an exploratory phase.
      <>
        actionable: {actionable}
        <ActionableNotification
          kind={kind}
          title={title}
          subtitle={subtitle}
          hideCloseButton={hideCloseButton}
          lowContrast={lowContrast}
        />
      </>
    ),
  }
);

figma.connect(
  InlineNotification,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=WhsTspVnawA9vgXk-4',
  {
    variant: { Type: 'Inline short', Actionable: 'False' },
    props: sharedNotificationProps,
    example: ({ title, kind, subtitle, hideCloseButton, actionable }) => (
      // Disclaimer: Code Connect is currently in beta and
      // integration with Carbon React is in an exploratory phase.
      <>
        actionable: {actionable}
        <InlineNotification
          title={title}
          kind={kind}
          subtitle={subtitle}
          hideCloseButton={hideCloseButton}
        />
      </>
    ),
  }
);

// figma.connect(
//   InlineNotification,
//   'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=WhsTspVnawA9vgXk-4',
//   {
//     variant: { Actionable: 'False', Type: 'Inline long' },
//     props: sharedNotificationProps,
//     example: ({ title, kind, subtitle, hideCloseButton }) => (
//       // Disclaimer: Code Connect is currently in beta and
//       // integration with Carbon React is in an exploratory phase.
//       <InlineNotification
//         title={title}
//         kind={kind}
//         subtitle={subtitle}
//         hideCloseButton={hideCloseButton}
//       />
//     ),
//   }
// );

// figma.connect(
//   ToastNotification,
//   'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=WhsTspVnawA9vgXk-4',
//   {
//     variant: { Actionable: 'False', Type: 'Toast' },
//     props: sharedNotificationProps,
//     example: ({ title, kind, subtitle, hideCloseButton, caption }) => (
//       // Disclaimer: Code Connect is currently in beta and
//       // integration with Carbon React is in an exploratory phase.
//       <ToastNotification
//         kind={kind}
//         title={title}
//         subtitle={subtitle}
//         caption={caption}
//         // hideCloseButton={hideCloseButton}
//       />
//     ),
//   }
// );
