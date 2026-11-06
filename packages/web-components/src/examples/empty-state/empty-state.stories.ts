/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { action } from 'storybook/actions';

import DocsPage from './empty-state.mdx';

import './example/src/styles/_empty-state.scss';
import './example/src/styles/_story-styles.scss';
import customIllustration from './example/src/assets/custom-illustration.svg?url';
import './example/src/preview-components/empty-state-preview';
import './example/src/preview-components/empty-state-with-isometric-illustration';
import './example/src/preview-components/empty-state-with-pictogram-illustration';
import './example/src/preview-components/empty-state-unit';

// ─── Stories: base empty-state (same as ibm-products) ────────────────────────

const emptyStateCommonProps = {
  heading: 'Start by adding data assets',
  headingAs: 'h3',
  size: 'md',
  subtitleType: 'default',
  illustrationSrc: '',
  illustrationDescription: '',
  actionType: 'none',
  secondaryAction: false,
  linkText: '',
  linkTarget: '',
};

const baseArgTypes = {
  subtitleType: {
    name: 'subtitle-type',
    control: { type: 'select' },
    options: ['default', 'withTooltip'],
  },
  headingAs: {
    name: 'heading-as',
    control: { type: 'select' },
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
  actionType: {
    name: 'action-type',
    control: { type: 'select' },
    options: ['none', 'text', 'icon'],
  },
};

const renderBase = (args) => html`
  <empty-state-preview
    heading-as="${args.headingAs}"
    size="${args.size}"
    heading="${args.heading}"
    subtitle-type="${args.subtitleType}"
    illustration-src="${args.illustrationSrc}"
    illustration-description="${args.illustrationDescription}"
    action-type="${args.actionType}"
    ?secondary-action="${args.secondaryAction}"
    link-text="${args.linkText}"
    link-target="${args.linkTarget}"
    @empty-state-action-click="${action('Clicked empty state action button')}"
    @empty-state-secondary-action-click="${action('Clicked empty state secondary action button')}">
  </empty-state-preview>
`;

export const Default = {
  parameters: { layout: 'padded' },
  args: { ...emptyStateCommonProps },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithTooltipInSubtitle = {
  name: 'With tooltip in subtitle',
  parameters: { layout: 'padded' },
  args: { ...emptyStateCommonProps, subtitleType: 'withTooltip' },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithCustomIllustration = {
  name: 'With custom illustration',
  parameters: { layout: 'padded' },
  args: {
    ...emptyStateCommonProps,
    illustrationSrc: customIllustration,
    illustrationDescription: 'Test alt text',
  },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithAction = {
  name: 'With action',
  parameters: { layout: 'padded' },
  args: { ...emptyStateCommonProps, actionType: 'text' },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithActionIconButton = {
  name: 'With action icon button',
  parameters: { layout: 'padded' },
  args: { ...emptyStateCommonProps, actionType: 'icon' },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithSecondaryAction = {
  name: 'With secondary action',
  parameters: { layout: 'padded' },
  args: {
    ...emptyStateCommonProps,
    actionType: 'text',
    secondaryAction: true,
  },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithLink = {
  name: 'With link',
  parameters: { layout: 'padded' },
  args: {
    ...emptyStateCommonProps,
    linkText: 'View documentation',
    linkTarget: '_blank',
  },
  argTypes: baseArgTypes,
  render: renderBase,
};

export const WithActionAndLink = {
  name: 'With action and link',
  parameters: { layout: 'padded' },
  args: {
    ...emptyStateCommonProps,
    actionType: 'icon',
    linkText: 'View documentation',
  },
  argTypes: baseArgTypes,
  render: renderBase,
};

// ─── Story: unit with isometric illustration ─────────────────────────────────

export const emptyStateIsometric = {
  name: 'Empty State unit with isometric illustration',
  parameters: { layout: 'padded' },
  args: {
    illustrationKey: 'No data',
    size: 'md',
    heading: 'Get started by adding an asset',
    subtitle:
      'Unlock product insights by adding assets from your system or cloud environment.',
    actionText: 'Add asset',
    linkText: 'Learn more',
    linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
  },
  argTypes: {
    illustrationKey: {
      name: 'illustration type',
      description: 'Isometric illustration to display.',
      control: { type: 'select' },
      options: ['No data', 'Not found', 'Unauthorized', 'Error', 'Notification'],
    },
    size: { control: { type: 'select' }, options: ['md', 'sm'] },
  },
  render: (args) => html`
    <empty-state-isometric
      illustration-key="${args.illustrationKey}"
      size="${args.size}"
      heading="${args.heading}"
      subtitle="${args.subtitle}"
      action-text="${args.actionText}"
      link-text="${args.linkText}"
      link-href="${args.linkHref}">
    </empty-state-isometric>
  `,
};

// ─── Story: unit with pictogram illustration ──────────────────────────────────

export const emptyStatePictogram = {
  name: 'Empty State unit with pictogram illustration',
  parameters: { layout: 'padded' },
  args: {
    pictogramKey: 'First use',
    size: 'md',
    heading: 'Get started by adding an asset',
    subtitle:
      'Unlock product insights by adding assets from your system or cloud environment.',
    actionText: 'Add asset',
    linkText: 'Learn more',
    linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
  },
  argTypes: {
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
  },
  render: (args) => html`
    <empty-state-pictogram
      pictogram-key="${args.pictogramKey}"
      size="${args.size}"
      heading="${args.heading}"
      subtitle="${args.subtitle}"
      action-text="${args.actionText}"
      link-text="${args.linkText}"
      link-href="${args.linkHref}">
    </empty-state-pictogram>
  `,
};

// ─── Story: empty state in a UI ──────────────────────────────────────────────

export const emptyStateInUI = {
  name: 'Empty State in a UI',
  args: { placement: 'left' },
  argTypes: {
    placement: {
      control: { type: 'radio' },
      options: ['left', 'centre'],
      description:
        'Alignment of every empty state relative to its own container.',
    },
  },
  render: (args) => html`
    <empty-state-unit placement="${args.placement}"></empty-state-unit>
  `,
};

const meta: Meta = {
  title: 'Examples/EmptyStates/EmptyState',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

export default meta;
