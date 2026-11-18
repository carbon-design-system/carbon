/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { Meta } from '@storybook/web-components';
import { action } from 'storybook/actions';

import DocsPage from './empty-state.mdx';

import './example/src/styles/_empty-state.scss';
import './example/src/styles/_story-styles.scss';
import './example/src/preview-components/empty-state-preview';
import './example/src/preview-components/empty-state-variants-preview';
import './example/src/preview-components/empty-state-with-isometric-illustration';
import './example/src/preview-components/empty-state-with-pictogram-illustration';
import './example/src/preview-components/empty-state-unit';

// ─── Stories: base empty-state (same as ibm-products) ────────────────────────

const emptyStateCommonProps = {
  heading: 'Start by adding data assets',
  headingAs: 'h3',
  size: 'md',
  subtitleType: 'default',
  actionType: 'none',
  WithTooltipInSubtitle: false,
  WithCustomIllustration: false,
  WithAction: false,
  WithActionIconButton: false,
  WithSecondaryAction: false,
  WithLink: false,
  WithActionAndLink: false,
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
    description:
      'Show an icon action button combined with a documentation link.',
    control: { type: 'boolean' },
  },
};

const renderBase = (args) => html`
  <empty-state-preview
    heading-as="${args.headingAs}"
    size="${args.size}"
    heading="${args.heading}"
    subtitle-type="${args.subtitleType}"
    action-type="${args.actionType}"
    ?with-tooltip-in-subtitle="${args.WithTooltipInSubtitle}"
    ?with-custom-illustration="${args.WithCustomIllustration}"
    ?with-action="${args.WithAction}"
    ?with-action-icon-button="${args.WithActionIconButton}"
    ?with-secondary-action="${args.WithSecondaryAction}"
    ?with-link="${args.WithLink}"
    ?with-action-and-link="${args.WithActionAndLink}"
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

// ─── Stories: preset illustration empty states ───────────────────────────────

const illustrationDefaultArgs = {
  headingAs: 'h3',
  size: 'md',
  heading: 'Empty state title',
  subtitle: 'Description text explaining why this section is empty.',
  illustrationDescription: 'Test alt text',
  illustrationTheme: 'light',
  actionType: 'none',
  WithDarkModeIllustration: false,
  WithAction: false,
  WithActionIconButton: false,
  WithSecondaryAction: false,
  WithLink: false,
  WithActionAndLink: false,
};

const illustrationArgTypes = {
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
  WithDarkModeIllustration: {
    description: 'Show the dark mode illustration.',
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
    description:
      'Show an icon action button combined with a documentation link.',
    control: { type: 'boolean' },
  },
};

const renderIllustration = (args) => {
  const tag = unsafeStatic(args.tag);
  return staticHtml`
    <${tag}
      heading-as="${args.headingAs}"
      size="${args.size}"
      heading="${args.heading}"
      subtitle="${args.subtitle}"
      illustration-description="${args.illustrationDescription}"
      illustration-theme="${args.illustrationTheme}"
      action-type="${args.actionType}"
      ?with-dark-mode-illustration="${args.WithDarkModeIllustration}"
      ?with-action="${args.WithAction}"
      ?with-action-icon-button="${args.WithActionIconButton}"
      ?with-secondary-action="${args.WithSecondaryAction}"
      ?with-link="${args.WithLink}"
      ?with-action-and-link="${args.WithActionAndLink}"
      @empty-state-action-click="${action('Clicked empty state action button')}"
      @empty-state-secondary-action-click="${action('Clicked empty state secondary action button')}">
    </${tag}>
  `;
};

const illustrationStory = (name: string, tag: string) => ({
  name,
  parameters: { layout: 'padded' },
  args: { ...illustrationDefaultArgs, tag },
  argTypes: { ...illustrationArgTypes, tag: { table: { disable: true } } },
  render: renderIllustration,
});

export const ErrorEmptyState = illustrationStory(
  'Error empty state',
  'error-empty-state-preview'
);

export const NoDataEmptyState = illustrationStory(
  'No data empty state',
  'no-data-empty-state-preview'
);

export const NoTagsEmptyState = illustrationStory(
  'No tags empty state',
  'no-tags-empty-state-preview'
);

export const NotFoundEmptyState = illustrationStory(
  'Not found empty state',
  'not-found-empty-state-preview'
);

export const NotificationsEmptyState = illustrationStory(
  'Notifications empty state',
  'notifications-empty-state-preview'
);

export const UnauthorizedEmptyState = illustrationStory(
  'Unauthorized empty state',
  'unauthorized-empty-state-preview'
);

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
