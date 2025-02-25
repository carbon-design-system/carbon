/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  InlineNotification,
  ToastNotification,
  ActionableNotification,
  unstable__Callout as Callout,
} from '@carbon/react';
import figma from '@figma/code-connect';

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

// Inline
figma.connect(
  InlineNotification,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=4179-105911&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'False' },
    props: sharedNotificationProps,
    example: ({ title, kind, subtitle, hideCloseButton, lowContrast }) => (
      <InlineNotification
        title={title}
        kind={kind}
        subtitle={subtitle}
        hideCloseButton={hideCloseButton}
        lowContrast={lowContrast}
      />
    ),
  }
);

// Inline - actionable
figma.connect(
  ActionableNotification,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=4179-105911&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'True' },
    props: sharedNotificationProps,
    example: ({ title, kind, subtitle, hideCloseButton, lowContrast }) => (
      <ActionableNotification
        inline
        kind={kind}
        title={title}
        subtitle={subtitle}
        hideCloseButton={hideCloseButton}
        lowContrast={lowContrast}
        actionButtonLabel="Action"
        onActionButtonClick={() => myFunction()}
        onClose={() => myFunction()}
        onCloseButtonClick={() => myFunction()}
      />
    ),
  }
);

// Toast
figma.connect(
  ToastNotification,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=84336-35011&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'False' },
    props: {
      title: figma.string('Title text'),
      subtitle: figma.string('Message text'),
      caption: figma.string('Time text'),
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
    },
    example: ({
      title,
      kind,
      subtitle,
      caption,
      lowContrast,
      hideCloseButton,
    }) => (
      <ToastNotification
        kind={kind}
        title={title}
        subtitle={subtitle}
        caption={caption}
        hideCloseButton={hideCloseButton}
        lowContrast={lowContrast}
      />
    ),
  }
);

// Toast -- actionable
figma.connect(
  ActionableNotification,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-Carbon-Design-System?node-id=84336-35011&t=nJ89fkK549fgCUuf-4',
  {
    variant: { Actionable: 'True' },
    props: sharedNotificationProps,
    example: ({ title, kind, subtitle, hideCloseButton, lowContrast }) => (
      <ActionableNotification
        kind={kind}
        title={title}
        subtitle={subtitle}
        hideCloseButton={hideCloseButton}
        lowContrast={lowContrast}
        actionButtonLabel="Action"
        onActionButtonClick={() => myFunction()}
        onClose={() => myFunction()}
        onCloseButtonClick={() => myFunction()}
      />
    ),
  }
);

// Callout
figma.connect(
  Callout,
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
    example: ({ title, kind, subtitle, lowContrast }) => (
      <Callout
        title={title}
        kind={kind}
        subtitle={subtitle}
        lowContrast={lowContrast}
      />
    ),
  }
);
