/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import EmptyState from './EmptyState';
import errorLight from '../assets/error-light.svg';
import errorDark from '../assets/error-dark.svg';
import noDataLight from '../assets/no-data-light.svg';
import noDataDark from '../assets/no-data-dark.svg';
import noTagsLight from '../assets/no-tags-light.svg';
import noTagsDark from '../assets/no-tags-dark.svg';
import notFoundLight from '../assets/not-found-light.svg';
import notFoundDark from '../assets/not-found-dark.svg';
import notificationLight from '../assets/notification-light.svg';
import notificationDark from '../assets/notification-dark.svg';
import unauthorizedLight from '../assets/unauthorized-light.svg';
import unauthorizedDark from '../assets/unauthorized-dark.svg';

const illustrationPropTypes = {
  /** Illustration theme. Pass `'dark'` when the app uses a dark theme (g90/g100). */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,
  /** Main heading text. */
  title: PropTypes.node,
};

/**
 * Factory that creates a thin `EmptyState` wrapper pre-wired with a
 * light/dark illustration pair. Any `EmptyState` prop can be passed through.
 */
function makeIllustrationEmptyState(displayName, lightSvg, darkSvg) {
  const Component = React.forwardRef(function (
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
        illustration={illustrationTheme === 'dark' ? darkSvg : lightSvg}
        title={title}
        subtitle={subtitle}
        {...rest}
      />
    );
  });
  Component.displayName = displayName;
  Component.propTypes = illustrationPropTypes;
  return Component;
}

export const ErrorEmptyState = makeIllustrationEmptyState(
  'ErrorEmptyState',
  errorLight,
  errorDark
);

export const NoDataEmptyState = makeIllustrationEmptyState(
  'NoDataEmptyState',
  noDataLight,
  noDataDark
);

export const NoTagsEmptyState = makeIllustrationEmptyState(
  'NoTagsEmptyState',
  noTagsLight,
  noTagsDark
);

export const NotFoundEmptyState = makeIllustrationEmptyState(
  'NotFoundEmptyState',
  notFoundLight,
  notFoundDark
);

export const NotificationsEmptyState = makeIllustrationEmptyState(
  'NotificationsEmptyState',
  notificationLight,
  notificationDark
);

export const UnauthorizedEmptyState = makeIllustrationEmptyState(
  'UnauthorizedEmptyState',
  unauthorizedLight,
  unauthorizedDark
);
