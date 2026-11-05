/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import EmptyState from './EmptyState';
import lightIllustration from '../assets/error-light.svg';
import darkIllustration from '../assets/error-dark.svg';

/**
 * Thin wrapper around `EmptyState` with a default illustration and copy.
 * Any `EmptyState` prop can be passed to override the defaults.
 */
export const ErrorEmptyState = React.forwardRef(function ErrorEmptyState(
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

ErrorEmptyState.displayName = 'ErrorEmptyState';

ErrorEmptyState.propTypes = {
  /**
   * Illustration theme. Pass `dark` when the app uses a dark theme (g90/g100).
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,
  /** Main heading text. */
  title: PropTypes.node,
};

export default ErrorEmptyState;
