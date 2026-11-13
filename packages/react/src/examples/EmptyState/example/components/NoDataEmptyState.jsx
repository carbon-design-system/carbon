/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import EmptyState from './EmptyState';
import lightIllustration from '../assets/no-data-light.svg';
import darkIllustration from '../assets/no-data-dark.svg';

/**
 * Thin wrapper around `EmptyState` with a default illustration and copy.
 * Any `EmptyState` prop can be passed to override the defaults.
 */
export const NoDataEmptyState = React.forwardRef(function NoDataEmptyState(
  {
    illustrationTheme = 'light',
    subtitle = 'Description text explaining why this section is empty.',
    title = 'Empty state title',
    ...rest
  },
  ref
) {
  return (
    <EmptyState
      ref={ref}
      illustration={
        illustrationTheme === 'dark' ? darkIllustration : lightIllustration
      }
      title={title}
      subtitle={subtitle}
      {...rest}
    />
  );
});

NoDataEmptyState.displayName = 'NoDataEmptyState';

NoDataEmptyState.propTypes = {
  /**
   * Illustration theme. Pass `dark` when the app uses a dark theme (g90/g100).
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,
  /** Main heading text. */
  title: PropTypes.node,
};

export default NoDataEmptyState;
