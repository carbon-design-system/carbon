/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { EmptyState } from './EmptyState';
import { NoDataEmptyState } from './NoDataEmptyState';
import { NotFoundEmptyState } from './NotFoundEmptyState';
import { ErrorEmptyState } from './ErrorEmptyState';
import { UnauthorizedEmptyState } from './UnauthorizedEmptyState';
import { NotificationsEmptyState } from './NotificationsEmptyState';
import { NoTagsEmptyState } from './NoTagsEmptyState';

import figma from '@figma/code-connect';
import { Add } from '@carbon/icons-react';

const connectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=420-2434';

const sharedProps = {
  action: figma.boolean('Button', {
    true: {
      text: 'Button',
      onClick: () => console.log("clicked empty state action button'),"),
      renderIcon: (props) => <Add size={20} {...props} />,
      iconDescription: 'Add icon',
    },
    false: undefined,
  }),
  link: figma.boolean('Link', {
    true: {
      text: 'Link',
      href: 'https://www.carbondesignsystem.com',
      target: '_blank',
    },
    false: undefined,
  }),
  size: figma.enum('Size', {
    Large: 'lg',
    Small: 'sm',
  }),
  illustrationPosition: figma.enum('Illustration position', {
    Top: 'top',
    Right: 'right',
    Left: 'left',
    Bottom: 'bottom',
  }),
  title: figma.string('Title text'),
  subtitle: figma.string('Subtitle text'),
};

// EmptyState
figma.connect(EmptyState, connectionURL, {
  variant: {
    Illustration: false,
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <EmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      // define below props if you want to display a custom illustration
      // illustration="./path/to/illustration.svg"
      // illustrationPosition="top"
      action={action}
      link={link}
    />
  ),
});

// NoDataEmptyState
figma.connect(NoDataEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'No data',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <NoDataEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});

// NotFoundEmptyState
figma.connect(NotFoundEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'Not found',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <NotFoundEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});

// ErrorEmptyState
figma.connect(ErrorEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'Error',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <ErrorEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});

// UnauthorizedEmptyState
figma.connect(UnauthorizedEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'Unauthorized',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <UnauthorizedEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});

// NotificationsEmptyState
figma.connect(NotificationsEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'Notification',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <NotificationsEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});

// NoTagsEmptyState
figma.connect(NoTagsEmptyState, connectionURL, {
  variant: {
    'Illustration kind': 'No tag',
  },
  props: sharedProps,
  example: ({ title, subtitle, size, illustrationPosition, action, link }) => (
    <NoTagsEmptyState
      title={title}
      subtitle={subtitle}
      size={size}
      illustrationPosition={illustrationPosition}
      action={action}
      link={link}
    />
  ),
});
