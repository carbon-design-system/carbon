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
    // 'Info square': 'info-square', missing from Figma
    // 'Warning alt': 'warning-alt' missing from Figma
  }),
  hideCloseButton: figma.boolean('Close', {
    true: false,
    false: true,
  }),
  lowContrast: figma.boolean('High contrast', {
    true: false,
    false: true,
  }),
  inline: figma.enum('Type', {
    'Inline short': true,
    'Inline long': true,
  }),
  button: figma.nestedProps('Button', {
    // currently grabbing the text from the icon button not the action button
    // tracking here https://github.com/figma/code-connect/issues/11
    actionButtonLabel: figma.string('Button text'),
  }),
  // this doesn't work
  // button: figma.nestedProps('Notification action button item', {
  //   actionButtonItem: figma.nestedProps('Button', {
  //     actionButtonLabel: figma.string('Button text'),
  //   }),
  // }),
};

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
      lowContrast,
      inline,
      button,
    }) => (
      <ActionableNotification
        inline={inline}
        kind={kind}
        title={title}
        subtitle={subtitle}
        hideCloseButton={hideCloseButton}
        lowContrast={lowContrast}
        actionButtonLabel={button.actionButtonLabel}
        onActionButtonClick={() => myFunction()}
        onClose={() => myFunction()}
        onCloseButtonClick={() => myFunction()}
      />
    ),
  }
);

figma.connect(
  InlineNotification,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=lJU3KHSU1pTpZ32z-4',
  {
    variant: { Type: 'Inline short' },

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

figma.connect(
  InlineNotification,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=lJU3KHSU1pTpZ32z-4',
  {
    variant: { Type: 'Inline long' },
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

figma.connect(
  ToastNotification,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4179-105911&mode=design&t=WhsTspVnawA9vgXk-4',
  {
    variant: { Type: 'Toast' },
    props: sharedNotificationProps,
    example: ({ title, kind, subtitle, caption, lowContrast }) => (
      <ToastNotification
        kind={kind}
        title={title}
        subtitle={subtitle}
        caption={caption}
        lowContrast={lowContrast}
      />
    ),
  }
);
