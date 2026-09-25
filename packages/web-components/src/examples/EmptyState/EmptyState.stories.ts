/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import type { Meta } from '@storybook/web-components';

import DocsPage from './EmptyState.mdx';

import './example/styles/_empty-state.scss';
import './example/styles/_story-styles.scss';
import './example/preview-components/EmptyStateWithIsometricIllustration';
import './example/preview-components/EmptyStateWithPictogramIllustration';
import './example/preview-components/EmptyStateUnit';

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
    <cds-empty-state-isometric
      illustration-key="${args.illustrationKey}"
      size="${args.size}"
      heading="${args.heading}"
      subtitle="${args.subtitle}"
      action-text="${args.actionText}"
      link-text="${args.linkText}"
      link-href="${args.linkHref}">
    </cds-empty-state-isometric>
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
    <cds-empty-state-pictogram
      pictogram-key="${args.pictogramKey}"
      size="${args.size}"
      heading="${args.heading}"
      subtitle="${args.subtitle}"
      action-text="${args.actionText}"
      link-text="${args.linkText}"
      link-href="${args.linkHref}">
    </cds-empty-state-pictogram>
  `,
};

// ─── Story: empty state unit ──────────────────────────────────────────────────

export const emptyStateInUI = {
  name: 'Empty State unit',
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
    <cds-empty-state-unit placement="${args.placement}"></cds-empty-state-unit>
  `,
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Examples/EmptyState',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

export default meta;
