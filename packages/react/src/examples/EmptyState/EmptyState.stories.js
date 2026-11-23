/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import DocsPage from './EmptyState.mdx';
import { EmptyStateVariantsPreview } from './example/preview-components/EmptyState/EmptyStateVariantsPreview';
import { EmptyStateWithIsometricIllustration } from './example/preview-components/EmptyState/EmptyStateWithIsometricIllustration';
import { EmptyStateWithPictogramIllustration } from './example/preview-components/EmptyState/EmptyStateWithPictogramIllustration';
import { EmptyStateUnit } from './example/preview-components/EmptyState/EmptyStateUnit';
import {
  ErrorEmptyStatePreview,
  NoDataEmptyStatePreview,
  NoTagsEmptyStatePreview,
  NotFoundEmptyStatePreview,
  NotificationsEmptyStatePreview,
  UnauthorizedEmptyStatePreview,
} from './example/preview-components/EmptyState/IllustrationEmptyStatePreviews';

export default {
  title: 'Examples/EmptyStates/EmptyState',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

// ─── Shared argTypes / args for illustration-based stories ───────────────────
const illustrationArgTypes = {
  headingAs: {
    control: { type: 'select' },
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  illustrationTheme: {
    control: { type: 'select' },
    options: ['light', 'dark'],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  WithAction: {
    description: 'Show a text action button.',
    control: { type: 'boolean' },
  },
  WithActionIconButton: {
    description: 'Show an icon action button.',
    control: { type: 'boolean' },
  },
  WithSecondaryAction: {
    description: 'Show primary and secondary action buttons.',
    control: { type: 'boolean' },
  },
  WithLink: {
    description: 'Show a documentation link.',
    control: { type: 'boolean' },
  },
  WithActionAndLink: {
    description: 'Show an icon action button combined with a documentation link.',
    control: { type: 'boolean' },
  },
};

const illustrationDefaultArgs = {
  headingAs: 'h3',
  title: 'Empty state title',
  subtitle: 'Description text explaining why this section is empty.',
  illustrationDescription: 'Test alt text',
  onActionClick: action('Clicked empty state action button'),
  WithAction: false,
  WithActionIconButton: false,
  WithSecondaryAction: false,
  WithLink: false,
  WithActionAndLink: false,
};

// ─── Story: Default EmptyState (base, with variant controls) ─────────────────
export const Default = (args) => <EmptyStateVariantsPreview {...args} />;
Default.parameters = { layout: 'padded' };
Default.argTypes = {
  subtitleType: {
    name: 'subtitle',
    control: { type: 'select' },
    options: ['default', 'withTooltip'],
  },
  headingAs: {
    control: { type: 'select' },
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  actionType: {
    control: { type: 'select' },
    options: ['none', 'text', 'icon'],
  },
  WithTooltipInSubtitle: {
    description: 'Show subtitle with an inline tooltip.',
    control: { type: 'boolean' },
  },
  WithCustomIllustration: {
    description: 'Render with a custom SVG illustration.',
    control: { type: 'boolean' },
  },
  WithAction: {
    description: 'Show a text action button.',
    control: { type: 'boolean' },
  },
  WithActionIconButton: {
    description: 'Show an icon action button.',
    control: { type: 'boolean' },
  },
  WithSecondaryAction: {
    description: 'Show primary and secondary action buttons.',
    control: { type: 'boolean' },
  },
  WithLink: {
    description: 'Show a documentation link.',
    control: { type: 'boolean' },
  },
  WithActionAndLink: {
    description: 'Show an icon action button combined with a documentation link.',
    control: { type: 'boolean' },
  },
};
Default.args = {
  title: 'Start by adding data assets',
  subtitleType: 'default',
  onActionClick: action('Clicked empty state action button'),
  WithTooltipInSubtitle: false,
  WithCustomIllustration: false,
  WithAction: false,
  WithActionIconButton: false,
  WithSecondaryAction: false,
  WithLink: false,
  WithActionAndLink: false,
};

// ─── Story: ErrorEmptyState ───────────────────────────────────────────────────
export const ErrorEmptyState = (args) => <ErrorEmptyStatePreview {...args} />;
ErrorEmptyState.storyName = 'Error empty state';
ErrorEmptyState.parameters = { layout: 'padded' };
ErrorEmptyState.argTypes = illustrationArgTypes;
ErrorEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: NoDataEmptyState ──────────────────────────────────────────────────
export const NoDataEmptyState = (args) => <NoDataEmptyStatePreview {...args} />;
NoDataEmptyState.storyName = 'No data empty state';
NoDataEmptyState.parameters = { layout: 'padded' };
NoDataEmptyState.argTypes = illustrationArgTypes;
NoDataEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: NoTagsEmptyState ──────────────────────────────────────────────────
export const NoTagsEmptyState = (args) => <NoTagsEmptyStatePreview {...args} />;
NoTagsEmptyState.storyName = 'No tags empty state';
NoTagsEmptyState.parameters = { layout: 'padded' };
NoTagsEmptyState.argTypes = illustrationArgTypes;
NoTagsEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: NotFoundEmptyState ────────────────────────────────────────────────
export const NotFoundEmptyState = (args) => (
  <NotFoundEmptyStatePreview {...args} />
);
NotFoundEmptyState.storyName = 'Not found empty state';
NotFoundEmptyState.parameters = { layout: 'padded' };
NotFoundEmptyState.argTypes = illustrationArgTypes;
NotFoundEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: NotificationsEmptyState ──────────────────────────────────────────
export const NotificationsEmptyState = (args) => (
  <NotificationsEmptyStatePreview {...args} />
);
NotificationsEmptyState.storyName = 'Notifications empty state';
NotificationsEmptyState.parameters = { layout: 'padded' };
NotificationsEmptyState.argTypes = illustrationArgTypes;
NotificationsEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: UnauthorizedEmptyState ───────────────────────────────────────────
export const UnauthorizedEmptyState = (args) => (
  <UnauthorizedEmptyStatePreview {...args} />
);
UnauthorizedEmptyState.storyName = 'Unauthorized empty state';
UnauthorizedEmptyState.parameters = { layout: 'padded' };
UnauthorizedEmptyState.argTypes = illustrationArgTypes;
UnauthorizedEmptyState.args = { ...illustrationDefaultArgs };

// ─── Story: Empty state with isometric illustration ───────────────────────────
export const emptyStateIsometric = (args) => (
  <EmptyStateWithIsometricIllustration {...args} />
);
emptyStateIsometric.storyName = 'Empty State unit with isometric illustration';
emptyStateIsometric.parameters = { layout: 'padded' };
emptyStateIsometric.args = {
  illustrationKey: 'No data',
  size: 'md',
  title: 'Get started by adding an asset',
  subtitle:
    'Unlock product insights by adding assets from your system or cloud environment.',
  actionText: 'Add asset',
  linkText: 'Learn more',
  linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
};
emptyStateIsometric.argTypes = {
  illustrationKey: {
    name: 'illustration type',
    description: 'Isometric illustration to display.',
    control: { type: 'select' },
    options: ['No data', 'Not found', 'Unauthorized', 'Error', 'Notification'],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
};

// ─── Story: unit with pictogram illustration ──────────────────────────────────
export const emptyStatePictogram = (args) => (
  <EmptyStateWithPictogramIllustration {...args} />
);
emptyStatePictogram.storyName = 'Empty State unit with pictogram illustration';
emptyStatePictogram.parameters = { layout: 'padded' };
emptyStatePictogram.args = {
  pictogramKey: 'First use',
  size: 'md',
  title: 'Get started by adding an asset',
  subtitle:
    'Unlock product insights by adding assets from your system or cloud environment.',
  actionText: 'Add asset',
  linkText: 'Learn more',
  linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
};
emptyStatePictogram.argTypes = {
  pictogramKey: {
    name: 'pictogram type',
    description: 'Carbon pictogram to display.',
    control: { type: 'select' },
    options: [
      'First use',
      'Error',
      'Warning',
      'Success',
      'No access',
      'Prerequisites',
      'Retry',
      'Offline',
      'Maintenance',
      'Unavailable',
      'Search',
      'Filtered',
    ],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
};

// ─── Story: empty state unit ──────────────────────────────────────────────────
export const emptyStateInUI = (args) => <EmptyStateUnit {...args} />;
emptyStateInUI.storyName = 'Empty State in a UI';
emptyStateInUI.args = { placement: 'left' };
emptyStateInUI.argTypes = {
  placement: {
    control: { type: 'radio' },
    options: ['left', 'centre'],
    description:
      'Alignment of every empty state relative to its own container.',
  },
};
