/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Link } from '@carbon/react';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import '../../global/js/utils/props-helper';
import { pkg } from '../../settings';
import EmptyStateIllustration from './EmptyStateIllustration.deprecated';

const blockClass = `${pkg.prefix}--empty-state`;
const componentName = 'EmptyStateV2';

export interface EmptyStateV2Props {
  /**
   * Props for the action button. Refer to the Carbon Components button documentation for full list of props.
   */
  action?: {
    text?: string;
  };

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Source for the illustration image if you choose to use your own custom image. Passing an illustration prop will supersede the kind option.
   */
  illustration?: string;

  /**
   * The alt text for the illustration
   */
  illustrationDescription?: string;

  /**
   * Designates the position of the illustration relative to the content
   */
  illustrationPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Empty state illustration theme variations.
   * To ensure you use the correct themed illustrations, you can conditionally specify light or dark
   * based on your app's current theme value. Example:
   * `illustrationTheme={appTheme === ('carbon--g100' || 'carbon--g90') ? 'dark' : 'light'}`
   */
  illustrationTheme?: 'light' | 'dark';

  /**
   * Determines which predefined illustration will be displayed
   */
  kind?:
    | 'error'
    | 'noData'
    | 'noTags'
    | 'notFound'
    | 'notifications'
    | 'unauthorized';

  /**
   * Props for the link. Refer to the Carbon Components link documentation for full list of props.
   */
  link?: {
    text?: string | ReactNode;
  };

  /**
   * Empty state size
   */
  size?: 'sm' | 'lg';

  /**
   * Empty state subtext
   */
  subtitle?: string | ReactNode;

  /**
   * Empty state heading
   */
  title: string | ReactNode;
}

/**
 * This is the V2 version of the `EmptyState` component. To use you must pass the `v2` prop to the V1 version of the component `EmptyState` and use the props below.
 * In order to avoid breaking changes in the future `EmptyStateV2` is not actually directly importable.
 * @deprecated
 */

export const EmptyStateV2 = React.forwardRef<HTMLDivElement, EmptyStateV2Props>(
  (props, ref) => {
    const {
      action,
      className,
      illustration: customIllustration,
      illustrationDescription,
      illustrationPosition = 'top',
      illustrationTheme,
      kind,
      link,
      size = 'lg',
      subtitle,
      title,
      ...rest
    } = props;

    const illustrationProps = {
      size,
      theme: illustrationTheme,
      title: illustrationDescription,
      kind,
    };

    return (
      <div
        {...rest}
        className={cx([
          blockClass,
          className,
          `${blockClass}-position--${illustrationPosition}`,
          {
            [`${blockClass}-type--${kind}`]: kind,
          },
        ])}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {customIllustration && (
          <img
            src={customIllustration}
            alt={illustrationDescription}
            className={cx([
              `${blockClass}__illustration`,
              `${blockClass}__illustration--${size}`,
            ])}
          />
        )}
        {!customIllustration && kind && (
          <EmptyStateIllustration {...illustrationProps} />
        )}
        <div className={`${blockClass}__content`}>
          <h3
            className={cx(`${blockClass}__header`, {
              [`${blockClass}__header--small`]: size === 'sm',
            })}
          >
            {title}
          </h3>
          {subtitle && (
            <div
              className={cx(`${blockClass}__subtitle`, {
                [`${blockClass}__subtitle--small`]: size === 'sm',
              })}
            >
              {subtitle}
            </div>
          )}
          {action && (
            <Button
              {...action}
              className={`${blockClass}__action-button`}
              size="sm"
            >
              {action.text}
            </Button>
          )}
          {link && (
            <Link {...link} className={`${blockClass}__link`}>
              {link.text}
            </Link>
          )}
        </div>
      </div>
    );
  }
);

/**@ts-ignore*/
EmptyStateV2.deprecated = {
  level: 'warn',
  details:
    'For more information, please refer to the Carbon docs https://carbondesignsystem.com/patterns/empty-states-pattern/',
};

// Return a placeholder if not released and not enabled by feature flag

EmptyStateV2.propTypes = {
  /**
   * Props for the action button. Refer to the Carbon Components button documentation for full list of props.
   */
  /**@ts-ignore*/
  action: PropTypes.PropTypes.shape({
    text: PropTypes.string,
  }),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Source for the illustration image if you choose to use your own custom image. Passing an illustration prop will supersede the kind option.
   */
  illustration: PropTypes.string,

  /**
   * The alt text for the illustration
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
   * Determines which predefined illustration will be displayed
   */
  kind: PropTypes.oneOf([
    'error',
    'noData',
    'noTags',
    'notFound',
    'notifications',
    'unauthorized',
  ]),

  /**
   * Props for the link. Refer to the Carbon Components link documentation for full list of props.
   */
  /**@ts-ignore*/
  link: PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),

  /**
   * Empty state size
   */
  size: PropTypes.oneOf(['sm', 'lg']),

  /**
   * Empty state subtext
   */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Empty state heading
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

EmptyStateV2.displayName = componentName;
