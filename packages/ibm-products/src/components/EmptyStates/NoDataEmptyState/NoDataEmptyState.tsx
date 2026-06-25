/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Link } from '@carbon/react';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

import { EmptyStateContent } from '../EmptyStateContent';
import NoDataIllustration from '../assets/NoDataIllustration';
import { defaults, EmptyStatePresetProps } from '../EmptyState';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--empty-state`;
const componentName = 'NoDataEmptyState';

export interface NoDataEmptyStateProps extends EmptyStatePresetProps {
  /**
   * Empty state illustration theme variations.
   * To ensure you use the correct themed illustrations, you can conditionally specify light or dark
   * based on your app's current theme value. Example:
   * `illustrationTheme={appTheme === ('carbon--g100' || 'carbon--g90') ? 'dark' : 'light'}`
   */
  illustrationTheme?: 'light' | 'dark';
}

/**
 * The `EmptyState` component follows the Carbon guidelines for empty states with some added specifications around illustration usage. For additional usage guidelines and documentation please refer to the links above.
 */
export const NoDataEmptyState = React.forwardRef<
  HTMLDivElement,
  NoDataEmptyStateProps
>(
  (
    {
      // The component props, in alphabetical order (for consistency).

      action,
      className,
      illustrationPosition = defaults.position,
      illustrationTheme,
      illustrationDescription,
      link,
      size = defaults.size,
      headingAs,
      subtitle,
      title,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass,
          className,
          `${blockClass}-position--${illustrationPosition}`,
          `${blockClass}-type--noData`
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <NoDataIllustration
          theme={illustrationTheme}
          size={size}
          alt={illustrationDescription || title}
        />
        <EmptyStateContent
          action={action}
          link={link}
          size={size}
          headingAs={headingAs}
          subtitle={subtitle}
          title={title || ''}
        />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
NoDataEmptyState.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
NoDataEmptyState.propTypes = {
  /**
   * Empty state action button
   */
  action: PropTypes.shape({
    /**@ts-ignore */
    ...Button.propTypes,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**@ts-ignore */
    onClick: Button.propTypes.onClick,
    text: PropTypes.string,
  }),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Empty state headingAs allows you to customize the type of heading element
   */
  headingAs: PropTypes.elementType,

  /**
   * The alt text for empty state svg images. If not provided , title will be used.
   */
  illustrationDescription: PropTypes.string,

  /**
   * Designates the position of the illustration relative to the content
   */
  illustrationPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Empty state illustration theme variations.
   * To ensure you use the correct themed illustrations, you can conditionally specify light or dark
   * based on your app's current theme value. Example:
   * `illustrationTheme={appTheme === ('carbon--g100' || 'carbon--g90') ? 'dark' : 'light'}`
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),

  /**
   * Empty state link object
   */
  /**@ts-ignore */
  link: PropTypes.any,

  /**
   * Empty state size
   */
  size: PropTypes.oneOf(['lg', 'sm']),

  /**
   * Empty state subtitle
   */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Empty state title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
