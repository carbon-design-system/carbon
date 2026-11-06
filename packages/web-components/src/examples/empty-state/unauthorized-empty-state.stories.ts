/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { action } from 'storybook/actions';

import './example/src/styles/_empty-state.scss';
import './example/src/styles/_story-styles.scss';
import './example/src/preview-components/unauthorized-empty-state-preview';

const defaultStoryProps = {
  headingAs: 'h3',
  size: 'md',
  heading: 'Empty state title',
  subtitle: 'Description text explaining why this section is empty.',
  illustrationDescription: 'Test alt text',
  illustrationTheme: 'light',
  actionType: 'none',
  secondaryAction: false,
  linkText: '',
};

const renderStory = (args) => html`
  <unauthorized-empty-state-preview
    heading-as="${args.headingAs}"
    size="${args.size}"
    heading="${args.heading}"
    subtitle="${args.subtitle}"
    illustration-description="${args.illustrationDescription}"
    illustration-theme="${args.illustrationTheme}"
    action-type="${args.actionType}"
    ?secondary-action="${args.secondaryAction}"
    link-text="${args.linkText}"
    @empty-state-action-click="${action('Clicked empty state action button')}"
    @empty-state-secondary-action-click="${action('Clicked empty state secondary action button')}">
  </unauthorized-empty-state-preview>
`;

export const Default = {
  name: 'Default',
  args: { ...defaultStoryProps },
  render: renderStory,
};

export const WithDarkModeIllustration = {
  name: 'With dark mode illustration',
  args: { ...defaultStoryProps,
    illustrationTheme: 'dark' },
  render: renderStory,
};

export const WithAction = {
  name: 'With action',
  args: { ...defaultStoryProps,
    actionType: 'text' },
  render: renderStory,
};

export const WithActionIconButton = {
  name: 'With action icon button',
  args: { ...defaultStoryProps,
    actionType: 'icon' },
  render: renderStory,
};

export const WithSecondaryAction = {
  name: 'With secondary action',
  args: { ...defaultStoryProps,
    actionType: 'text',
    secondaryAction: true },
  render: renderStory,
};

export const WithLink = {
  name: 'With link',
  args: { ...defaultStoryProps,
    linkText: 'View documentation' },
  render: renderStory,
};

export const WithActionAndLink = {
  name: 'With action and link',
  args: { ...defaultStoryProps,
    actionType: 'icon',
    linkText: 'View documentation' },
  render: renderStory,
};

const meta: Meta = {
  title: 'Examples/EmptyStates/UnauthorizedEmptyState',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    headingAs: {
      name: 'heading-as',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    illustrationTheme: {
      name: 'illustration-theme',
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    size: { control: { type: 'select' }, options: ['md', 'sm'] },
    actionType: {
      name: 'action-type',
      control: { type: 'select' },
      options: ['none', 'text', 'icon'],
    },
  },
};

export default meta;
