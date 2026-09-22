/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { EmptyState } from '../components/EmptyState';
import noDataIllustration from '../assets/no-data.svg';
import notFoundIllustration from '../assets/not-found.svg';
import unauthorizedIllustration from '../assets/unauthorized.svg';
import errorIllustration from '../assets/error.svg';
import notificationIllustration from '../assets/notification.svg';
import '../styles/_empty-state.scss';

type IllustrationKey = 'No data' | 'Not found' | 'Unauthorized' | 'Error' | 'Notification';

const illustrationMap: Record<IllustrationKey, string> = {
  'No data': noDataIllustration,
  'Not found': notFoundIllustration,
  Unauthorized: unauthorizedIllustration,
  Error: errorIllustration,
  Notification: notificationIllustration,
};

interface EmptyStateWithIsometricIllustrationProps {
  illustrationKey?: IllustrationKey;
  size?: 'md' | 'sm';
  title?: string;
  subtitle?: string;
  actionText?: string;
  linkText?: string;
  linkHref?: string;
}

export const EmptyStateWithIsometricIllustration = ({
  illustrationKey = 'No data',
  size = 'md',
  title = 'Get started by adding an asset',
  subtitle = 'Unlock product insights by adding assets from your system or cloud environment.',
  actionText = 'Add asset',
  linkText = 'Learn more',
  linkHref = 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
}: EmptyStateWithIsometricIllustrationProps) => (
  <EmptyState
    size={size}
    illustration={illustrationMap[illustrationKey]}
    title={title}
    subtitle={subtitle}
    action={actionText ? { text: actionText } : undefined}
    link={linkText && linkHref ? { text: linkText, href: linkHref } : undefined}
  />
);
