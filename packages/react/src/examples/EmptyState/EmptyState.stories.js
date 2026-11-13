/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import customIllustration from './example/assets/custom-illustration.svg';
import DocsPage from './EmptyState.mdx';
import { EmptyStateWithIsometricIllustration } from './example/preview-components/EmptyState/EmptyStateWithIsometricIllustration';
import { EmptyStateWithPictogramIllustration } from './example/preview-components/EmptyState/EmptyStateWithPictogramIllustration';
import { EmptyStateUnit } from './example/preview-components/EmptyState/EmptyStateUnit';
import { EmptyStatePreview } from './example/preview-components/EmptyState/EmptyStatePreview';

export default {
  title: 'Examples/EmptyStates/EmptyState',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

// ─── Stories: base EmptyState (same as ibm-products) ─────────────────────────
const emptyStateCommonProps = {
  title: 'Start by adding data assets',
  subtitleType: 'default',
  onActionClick: action('Clicked empty state action button'),
};

const Template = (args) => <EmptyStatePreview {...args} />;

const baseArgTypes = {
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
};

export const Default = Template.bind({});
Default.parameters = { layout: 'padded' };
Default.argTypes = baseArgTypes;
Default.args = { ...emptyStateCommonProps };

export const WithTooltipInSubtitle = Template.bind({});
WithTooltipInSubtitle.parameters = { layout: 'padded' };
WithTooltipInSubtitle.argTypes = baseArgTypes;
WithTooltipInSubtitle.args = {
  ...emptyStateCommonProps,
  subtitleType: 'withTooltip',
};

export const WithCustomIllustration = Template.bind({});
WithCustomIllustration.parameters = { layout: 'padded' };
WithCustomIllustration.argTypes = baseArgTypes;
WithCustomIllustration.args = {
  ...emptyStateCommonProps,
  illustration: customIllustration,
  illustrationDescription: 'Test alt text',
};

export const WithAction = Template.bind({});
WithAction.parameters = { layout: 'padded' };
WithAction.argTypes = baseArgTypes;
WithAction.args = { ...emptyStateCommonProps, actionType: 'text' };

export const WithActionIconButton = Template.bind({});
WithActionIconButton.storyName = 'With action icon button';
WithActionIconButton.parameters = { layout: 'padded' };
WithActionIconButton.argTypes = baseArgTypes;
WithActionIconButton.args = { ...emptyStateCommonProps, actionType: 'icon' };

export const WithSecondaryAction = Template.bind({});
WithSecondaryAction.parameters = { layout: 'padded' };
WithSecondaryAction.argTypes = baseArgTypes;
WithSecondaryAction.args = {
  ...emptyStateCommonProps,
  actionType: 'text',
  secondaryAction: true,
};

export const WithLink = Template.bind({});
WithLink.parameters = { layout: 'padded' };
WithLink.argTypes = baseArgTypes;
WithLink.args = {
  ...emptyStateCommonProps,
  linkText: 'View documentation',
  linkTarget: '_blank',
};

export const WithActionAndLink = Template.bind({});
WithActionAndLink.parameters = { layout: 'padded' };
WithActionAndLink.argTypes = baseArgTypes;
WithActionAndLink.args = {
  ...emptyStateCommonProps,
  actionType: 'icon',
  linkText: 'View documentation',
};

// ─── Story: unit with isometric illustration ─────────────────────────────────
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
