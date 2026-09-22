/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../button/button';
import '../link/link';
import '../../examples/EmptyState/index';

// ─── Illustration src map ─────────────────────────────────────────────────────
// These SVGs live alongside the component as story assets. In your own app,
// swap these for @carbon/pictograms-react components or your own SVG files.
import noDataSrc from './story-assets/no-data.svg';
import notFoundSrc from './story-assets/not-found.svg';
import unauthorizedSrc from './story-assets/unauthorized.svg';
import errorSrc from './story-assets/error.svg';
import notificationSrc from './story-assets/notification.svg';

const illustrationMap = {
  'No data': noDataSrc,
  'Not found': notFoundSrc,
  Unauthorized: unauthorizedSrc,
  Error: errorSrc,
  Notification: notificationSrc,
};

// ─── Default controls shared across unit stories ──────────────────────────────
const defaultArgs = {
  size: 'md',
  heading: 'Get started by adding an asset',
  subtitle:
    'Unlock product insights by adding assets from your system or cloud environment.',
  actionText: 'Add asset',
  actionKind: 'primary',
  linkText: 'Learn more',
  linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
};

const controls = {
  size: {
    control: 'select',
    description: 'Size variant — controls illustration dimensions.',
    options: ['md', 'sm'],
  },
  heading: {
    control: 'text',
    description: 'Main heading text.',
  },
  subtitle: {
    control: 'text',
    description: 'Subtitle / body copy shown below the heading.',
  },
  actionText: {
    control: 'text',
    description: 'Label for the optional action button.',
  },
  actionKind: {
    control: 'select',
    description: 'Kind of the action button.',
    options: ['primary', 'secondary', 'tertiary'],
  },
  linkText: {
    control: 'text',
    description: 'Label for the optional link.',
  },
  linkHref: {
    control: 'text',
    description: 'Href for the optional link.',
  },
};

// ─── Story: unit with isometric illustration ─────────────────────────────────
export const EmptyStateUnitIsometric = {
  name: 'Empty state unit with isometric illustration',
  parameters: { layout: 'padded' },
  args: {
    ...defaultArgs,
    illustrationKey: 'No data',
  },
  argTypes: {
    ...controls,
    illustrationKey: {
      name: 'illustration type',
      description: 'Isometric illustration to display.',
      control: 'select',
      options: Object.keys(illustrationMap),
    },
  },
  render: ({ illustrationKey, ...args }) => html`
    <cds-empty-state
      illustration-src="${illustrationMap[illustrationKey]}"
      illustration-description="${illustrationKey} isometric illustration"
      size="${ifDefined(args.size)}"
      heading="${args.heading}"
      subtitle="${ifDefined(args.subtitle)}"
      action-text="${ifDefined(args.actionText)}"
      action-kind="${ifDefined(args.actionKind)}"
      link-text="${ifDefined(args.linkText)}"
      link-href="${ifDefined(args.linkHref)}">
    </cds-empty-state>
  `,
};

// ─── Story: empty state in a full UI ─────────────────────────────────────────
// Delegates to the copy-paste example in src/examples/EmptyState.
export const EmptyStateInUI = {
  name: 'Empty state in a UI',
  parameters: { layout: 'fullscreen' },
  args: {
    placement: 'left',
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: ['left', 'centre'],
      description:
        'Alignment of every empty state relative to its own container.',
    },
  },
  render: ({ placement }) => html`
    <cds-empty-state-example placement="${placement}"></cds-empty-state-example>
  `,
};

const meta = {
  title: 'Examples/EmptyState',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
