/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocsPage from './EmptyState.mdx';
import { EmptyStateWithIsometricIllustration } from './example/preview-components/EmptyStateWithIsometricIllustration';
import { EmptyStateWithPictogramIllustration } from './example/preview-components/EmptyStateWithPictogramIllustration';
import { EmptyStateUnit } from './example/preview-components/EmptyStateUnit';

export default {
  title: 'Examples/EmptyState',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
  },
};

// ─── Story: unit with isometric illustration ─────────────────────────────────
export const emptyStateIsometric = (args) => <EmptyStateWithIsometricIllustration {...args} />;
emptyStateIsometric.storyName = 'Empty State unit with isometric illustration';
emptyStateIsometric.parameters = { layout: 'padded' };
emptyStateIsometric.args = {
  illustrationKey: 'No data',
  size: 'md',
  title: 'Get started by adding an asset',
  subtitle: 'Unlock product insights by adding assets from your system or cloud environment.',
  actionText: 'Add asset',
  actionKind: 'primary',
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
export const emptyStatePictogram = (args) => <EmptyStateWithPictogramIllustration {...args} />;
emptyStatePictogram.storyName = 'Empty State unit with pictogram illustration';
emptyStatePictogram.parameters = { layout: 'padded' };
emptyStatePictogram.args = {
  pictogramKey: 'No data',
  size: 'md',
  title: 'Get started by adding an asset',
  subtitle: 'Unlock product insights by adding assets from your system or cloud environment.',
  actionText: 'Add asset',
  actionKind: 'primary',
  linkText: 'Learn more',
  linkHref: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
};
emptyStatePictogram.argTypes = {
  pictogramKey: {
    name: 'pictogram type',
    description: 'Carbon pictogram to display.',
    control: { type: 'select' },
    options: ['No data', 'Not found', 'Unauthorized', 'Error', 'Notification'],
  },
  size: { control: { type: 'select' }, options: ['md', 'sm'] },
};

// ─── Story: empty state unit ──────────────────────────────────────────────────
export const emptyStateInUI = (args) => <EmptyStateUnit {...args} />;
emptyStateInUI.storyName = 'Empty State unit';
emptyStateInUI.args = { placement: 'left' };
emptyStateInUI.argTypes = {
  placement: {
    control: { type: 'radio' },
    options: ['left', 'centre'],
    description: 'Alignment of every empty state relative to its own container.',
  },
};
