/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { UnauthorizedEmptyStatePreview } from './example/preview-components/UnauthorizedEmptyState/UnauthorizedEmptyStatePreview';

const defaultStoryProps = {
  headingAs: 'h3',
  title: 'Empty state title',
  subtitle: 'Description text explaining why this section is empty.',
  illustrationDescription: 'Test alt text',
  onActionClick: action('Clicked empty state action button'),
};

export default {
  title: 'Examples/EmptyStates/UnauthorizedEmptyState',
  component: () => {},
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    headingAs: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    illustrationTheme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    size: { control: { type: 'select' }, options: ['md', 'sm'] },
    actionType: {
      control: { type: 'select' },
      options: ['none', 'text', 'icon'],
    },
  },
};

const Template = (args) => <UnauthorizedEmptyStatePreview {...args} />;

export const Default = Template.bind({});
Default.args = { ...defaultStoryProps };

export const WithDarkModeIllustration = Template.bind({});
WithDarkModeIllustration.args = {
  ...defaultStoryProps,
  illustrationTheme: 'dark',
};

export const WithAction = Template.bind({});
WithAction.args = { ...defaultStoryProps, actionType: 'text' };

export const WithActionIconButton = Template.bind({});
WithActionIconButton.storyName = 'With action icon button';
WithActionIconButton.args = { ...defaultStoryProps, actionType: 'icon' };

export const WithSecondaryAction = Template.bind({});
WithSecondaryAction.args = {
  ...defaultStoryProps,
  actionType: 'text',
  secondaryAction: true,
};

export const WithLink = Template.bind({});
WithLink.args = { ...defaultStoryProps, linkText: 'View documentation' };

export const WithActionAndLink = Template.bind({});
WithActionAndLink.args = {
  ...defaultStoryProps,
  actionType: 'icon',
  linkText: 'View documentation',
};
