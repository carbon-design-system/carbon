/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Add, Information } from '@carbon/icons-react';
import { Tooltip } from '@carbon/react';

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
 * Maps simple Storybook args to `EmptyState` props:
 * - `subtitleType`: `'default'` | `'withTooltip'` (base EmptyState stories)
 * - `actionType`: `'none'` | `'text'` | `'icon'`
 * - `secondaryAction`: boolean
 * - `linkText`, `linkHref`, `linkTarget`
 * - `onActionClick`: click handler for the action buttons
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
  ...rest
} = {}) => {
  let resolvedSubtitle = subtitle;
  if (subtitleType === 'default') {
    resolvedSubtitle = <DefaultSubtitle />;
  } else if (subtitleType === 'withTooltip') {
    resolvedSubtitle = <SubtitleWithTooltip />;
  }

  return {
    ...rest,
    subtitle: resolvedSubtitle,
    action:
      actionType === 'none'
        ? undefined
        : {
            text: 'Create new',
            onClick: onActionClick,
            ...(actionType === 'icon' && {
              renderIcon: (props) => <Add size={20} {...props} />,
              iconDescription: 'Add icon',
            }),
          },
    secondaryAction: secondaryAction
      ? { text: 'Learn more', onClick: onActionClick }
      : undefined,
    link: linkText
      ? { text: linkText, href: linkHref, target: linkTarget }
      : undefined,
  };
};
