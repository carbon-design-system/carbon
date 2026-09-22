/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ComponentType, SVGProps } from 'react';
import { EmptyState } from '../components/EmptyState';
import '../styles/_empty-state.scss';

type PictogramKey = 'No data' | 'Not found' | 'Unauthorized' | 'Error' | 'Notification';

type SvgProps = SVGProps<SVGSVGElement>;

const NoDataPictogram = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable={false} {...props}>
    <path d="M16 2L2 9.5v13L16 30l14-7.5v-13L16 2zm12 18.855L16 27.965 4 20.855V11.09l12-6.428 12 6.428v9.765zM16 4.035L26.679 10 16 15.965 5.321 10 16 4.035z" />
    <rect width="32" height="32" style={{ fill: 'none' }} />
  </svg>
);

const NotFoundPictogram = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable={false} {...props}>
    <path d="M16,26.3604c-6.8062,0-12.1055-3.5283-15.3242-10.2041-.0479-.0986-.0479-.2139,0-.3125,3.2188-6.6753,8.5181-10.2036,15.3242-10.2036s12.1064,3.5283,15.3242,10.2036l-.6484.3125c-3.1338-6.5005-8.0713-9.7964-14.6758-9.7964-6.5503,0-11.4614,3.2432-14.5996,9.6401,3.1382,6.3965,8.0493,9.6396,14.5996,9.6396v.7207ZM23.7451,24.2549l-4.2197-4.2207c-.9434.8252-2.1768,1.3262-3.5254,1.3262-2.9556,0-5.3599-2.4053-5.3599-5.3604s2.4043-5.3599,5.3599-5.3599,5.3604,2.4043,5.3604,5.3599c0,1.3486-.501,2.582-1.3262,3.5254l4.2207,4.2197-.5098.5098ZM16,11.3599c-2.5586,0-4.6401,2.0815-4.6401,4.6401s2.0815,4.6396,4.6401,4.6396,4.6396-2.0811,4.6396-4.6396-2.0811-4.6401-4.6396-4.6401Z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

const UnauthorizedPictogram = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable={false} {...props}>
    <path d="M24,14H22V8A6,6,0,0,0,10,8v6H8a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16A2,2,0,0,0,24,14ZM12,8a4,4,0,0,1,8,0v6H12ZM24,28H8V16H24Z" />
    <rect x="15" y="19" width="2" height="6" />
    <rect width="32" height="32" style={{ fill: 'none' }} />
  </svg>
);

const ErrorPictogram = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable={false} {...props}>
    <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12S22.6,28,16,28z" />
    <rect x="15" y="8" width="2" height="11" />
    <rect x="15" y="21" width="2" height="2" />
    <rect width="32" height="32" style={{ fill: 'none' }} />
  </svg>
);

const NotificationPictogram = (props: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable={false} {...props}>
    <path d="M28.7071,19.293,26,16.5859V13a10.0136,10.0136,0,0,0-9-9.9492V1H15V3.0508A10.0136,10.0136,0,0,0,6,13v3.5859L3.2929,19.293A1,1,0,0,0,3,20v3a1,1,0,0,0,1,1h7v.7768a5.152,5.152,0,0,0,4.5,5.1973A5.0057,5.0057,0,0,0,21,24.9966V24h7a1,1,0,0,0,1-1V20A1,1,0,0,0,28.7071,19.293ZM19,24.9966a3.0059,3.0059,0,0,1-3,2.9946h-.1216A3.1648,3.1648,0,0,1,13,24.7768V24h6ZM27,22H5V20.4141L7.707,17.707A1,1,0,0,0,8,17V13a8,8,0,0,1,16,0v4a1,1,0,0,0,.293.707L27,20.4141Z" />
    <rect width="32" height="32" style={{ fill: 'none' }} />
  </svg>
);

const pictogramMap: Record<PictogramKey, ComponentType<SvgProps>> = {
  'No data': NoDataPictogram,
  'Not found': NotFoundPictogram,
  Unauthorized: UnauthorizedPictogram,
  Error: ErrorPictogram,
  Notification: NotificationPictogram,
};

interface EmptyStateWithPictogramIllustrationProps {
  pictogramKey?: PictogramKey;
  size?: 'md' | 'sm';
  title?: string;
  subtitle?: string;
  actionText?: string;
  actionKind?: 'primary' | 'secondary' | 'tertiary';
  linkText?: string;
  linkHref?: string;
}

export const EmptyStateWithPictogramIllustration = ({
  pictogramKey = 'No data',
  size = 'md',
  title = 'Get started by adding an asset',
  subtitle = 'Unlock product insights by adding assets from your system or cloud environment.',
  actionText = 'Add asset',
  actionKind = 'primary',
  linkText = 'Learn more',
  linkHref = 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
}: EmptyStateWithPictogramIllustrationProps) => {
  const PictogramComponent = pictogramMap[pictogramKey];
  return (
    <EmptyState
      size={size}
      illustration={PictogramComponent}
      illustrationDescription={`${pictogramKey} pictogram`}
      title={title}
      subtitle={subtitle}
      action={actionText ? { text: actionText, kind: actionKind } : undefined}
      link={linkText && linkHref ? { text: linkText, href: linkHref } : undefined}
    />
  );
};
