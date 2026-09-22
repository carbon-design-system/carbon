/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ComponentType } from 'react';
import {
  Availability,
  CloudBuilderProfessionalServices,
  Container,
  DoNot,
  DoNot_02,
  Gear,
  Lock_02,
  Reliability,
  Reset,
  Slider,
  VisualInspection,
  Warning_01,
} from '@carbon/pictograms-react';
import { EmptyState } from '../components/EmptyState';
import '../styles/_empty-state.scss';

export type PictogramKey =
  | 'First use'
  | 'Error'
  | 'Warning'
  | 'Success'
  | 'No access'
  | 'Prerequisites'
  | 'Retry'
  | 'Offline'
  | 'Maintenance'
  | 'Unavailable'
  | 'Search'
  | 'Filtered';

const pictogramMap: Record<PictogramKey, ComponentType<any>> = {
  'First use': Container,
  Error: DoNot_02,
  Warning: Warning_01,
  Success: Reliability,
  'No access': Lock_02,
  Prerequisites: Gear,
  Retry: Reset,
  Offline: Availability,
  Maintenance: CloudBuilderProfessionalServices,
  Unavailable: DoNot,
  Search: VisualInspection,
  Filtered: Slider,
};

interface EmptyStateWithPictogramIllustrationProps {
  pictogramKey?: PictogramKey;
  size?: 'md' | 'sm';
  title?: string;
  subtitle?: string;
  actionText?: string;
  linkText?: string;
  linkHref?: string;
}

export const EmptyStateWithPictogramIllustration = ({
  pictogramKey = 'First use',
  size = 'md',
  title = 'Get started by adding an asset',
  subtitle = 'Unlock product insights by adding assets from your system or cloud environment.',
  actionText = 'Add asset',
  linkText = 'Learn more',
  linkHref = 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
}: EmptyStateWithPictogramIllustrationProps) => {
  const PictogramComponent = pictogramMap[pictogramKey];
  return (
    <EmptyState
      size={size}
      illustration={PictogramComponent}
      title={title}
      subtitle={subtitle}
      action={actionText ? { text: actionText } : undefined}
      link={linkText && linkHref ? { text: linkText, href: linkHref } : undefined}
    />
  );
};
