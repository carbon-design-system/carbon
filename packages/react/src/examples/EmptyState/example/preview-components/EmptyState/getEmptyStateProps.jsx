/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Add, Information } from '@carbon/icons-react';
import { Tooltip } from '@carbon/react';
import customIllustration from '../../assets/custom-illustration.svg';

const DefaultSubtitle = () => (
  <>
    Click <span>Upload assets</span> to upload your data
  </>
);

const SubtitleWithTooltip = () => (
  <>
    Click <span>here</span> to upload your data
    <Tooltip label="Facts and statistics collected together for reference or analysis">
      <Information size="16" />
    </Tooltip>
  </>
);

/**
 * Maps simple Storybook args to `EmptyState` props.
 * Used only by the Default story (EmptyStateVariantsPreview).
 *
 * Base controls:
 *   - `subtitleType`: `'default'` | `'withTooltip'`
 *   - `actionType`: `'none'` | `'text'` | `'icon'`
 *   - `secondaryAction`: boolean
 *   - `linkText`, `linkHref`, `linkTarget`
 *   - `onActionClick`: click handler
 *
 * Boolean variant flags:
 *   - `WithTooltipInSubtitle`   → subtitle becomes a tooltip node
 *   - `WithCustomIllustration`  → passes illustration + illustrationDescription
 *   - `WithAction`              → actionType becomes 'text'
 *   - `WithActionIconButton`    → actionType becomes 'icon'
 *   - `WithSecondaryAction`     → actionType 'text' + secondary button
 *   - `WithLink`                → documentation link
 *   - `WithActionAndLink`       → icon button + documentation link
 */
export const getEmptyStateProps = ({
  subtitleType,
  actionType = 'none',
  secondaryAction = false,
  linkText,
  linkHref = 'https://www.carbondesignsystem.com',
  linkTarget,
  onActionClick = () => {},
  subtitle,
  illustration,
  illustrationDescription,
  // boolean variant flags (Default story only)
  WithTooltipInSubtitle = false,
  WithCustomIllustration = false,
  WithAction = false,
  WithActionIconButton = false,
  WithSecondaryAction = false,
  WithLink = false,
  WithActionAndLink = false,
  ...rest
} = {}) => {
  // Resolve subtitle
  let resolvedSubtitle = subtitle;
  if (WithTooltipInSubtitle) {
    resolvedSubtitle = <SubtitleWithTooltip />;
  } else if (subtitleType === 'default') {
    resolvedSubtitle = <DefaultSubtitle />;
  } else if (subtitleType === 'withTooltip') {
    resolvedSubtitle = <SubtitleWithTooltip />;
  }

  // Resolve illustration: flag supplies the bundled SVG, otherwise use prop
  const resolvedIllustration = WithCustomIllustration
    ? customIllustration
    : illustration;
  const resolvedIllustrationDescription = WithCustomIllustration
    ? 'Test alt text'
    : illustrationDescription;

  // Boolean flags win over the actionType select
  const resolvedActionType =
    WithActionAndLink || WithActionIconButton
      ? 'icon'
      : WithSecondaryAction || WithAction
        ? 'text'
        : actionType;

  const resolvedSecondaryAction = WithSecondaryAction || secondaryAction;
  const resolvedLinkText =
    WithActionAndLink || WithLink ? 'View documentation' : linkText;
  const resolvedLinkTarget = WithLink ? '_blank' : linkTarget;

  return {
    ...rest,
    ...(resolvedIllustration !== undefined && {
      illustration: resolvedIllustration,
    }),
    ...(resolvedIllustrationDescription !== undefined && {
      illustrationDescription: resolvedIllustrationDescription,
    }),
    subtitle: resolvedSubtitle,
    action:
      resolvedActionType === 'none'
        ? undefined
        : {
            text: 'Create new',
            onClick: onActionClick,
            ...(resolvedActionType === 'icon' && {
              renderIcon: (props) => <Add size={20} {...props} />,
              iconDescription: 'Add icon',
            }),
          },
    secondaryAction: resolvedSecondaryAction
      ? { text: 'Learn more', onClick: onActionClick }
      : undefined,
    link: resolvedLinkText
      ? { text: resolvedLinkText, href: linkHref, target: resolvedLinkTarget }
      : undefined,
  };
};
