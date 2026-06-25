/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ElementType, ReactNode } from 'react';
import { EmptyStateV2 } from './EmptyStateV2.deprecated';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from '@carbon/react';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import '../../global/js/utils/props-helper';
import { pkg } from '../../settings';
import { ButtonProps, LinkProps } from '@carbon/react';

import { EmptyStateContent } from './EmptyStateContent';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--empty-state`;
const componentName = 'EmptyState';

enum sizes {
  lg = 'lg',
  sm = 'sm',
}

// Default values for props
export const defaults: { position: string; size: sizes } = {
  position: 'top',
  size: sizes.lg,
};

export interface EmptyStateAction extends ButtonProps<React.ElementType> {
  kind?: 'primary' | 'secondary' | 'tertiary';
  text?: string;
}

export interface CustomLink extends LinkProps<React.ElementType> {
  text?: ReactNode;
}

export interface EmptyStateProps {
  /**
   * Empty state action button
   */
  action?: EmptyStateAction;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Empty state illustration, specify the `src` for a provided illustration to be displayed. In the case of requiring a light and dark illustration of your own, simply pass the corresponding illustration based on the current theme of your application.
   * For example: `illustration={appTheme === 'dark' ? darkIllustration : lightIllustration}`
   */
  illustration?: string;

  /**
   * The alt text for empty state svg images. If not provided , title will be used.
   */
  illustrationDescription?: string;

  /**
   * Designates the position of the illustration relative to the content
   */
  illustrationPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Empty state link object
   */
  link?: CustomLink;

  /**
   * Customize the heading element.  Set to "h1" when EmptyState is full page, i.e. there is no higher header.
   * Otherwise, you normally don't need to specify this: EmptyState will automatically pick the right heading level
   * (h2-h6) by leveraging Section and Heading.
   */
  headingAs?: (() => ReactNode) | string | ElementType;

  /**
   * Empty state size
   */
  size?: 'lg' | 'sm';

  /**
   * Empty state subtitle
   */
  subtitle?: ReactNode;

  /**
   * Empty state title
   */
  title: ReactNode;

  /**
   * **Deprecated:** Designates which version of the EmptyState component is being used. Refer to V2 documentation separately.
   * @deprecated
   */
  v2?: boolean;
}

export type EmptyStatePresetProps = Omit<EmptyStateProps, 'illustration'>;

/**
 * The `EmptyState` component follows the Carbon guidelines for empty states with some added specifications around illustration usage. For additional usage guidelines and documentation please refer to the links above.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ v2 = false, ...props }, ref) => {
    if (v2) {
      return <EmptyStateV2 {...props} />;
    }
    const {
      action,
      className,
      illustration,
      illustrationDescription,
      illustrationPosition = defaults.position,
      link,
      size = defaults.size,
      headingAs,
      subtitle,
      title,
      ...rest
    } = props;
    return (
      <div
        {...rest}
        className={cx(blockClass, `${blockClass}-type--default`, className, {
          [`${blockClass}-position--${illustrationPosition}`]: !!illustration,
        })}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {illustration && (
          <img
            src={illustration}
            alt={illustrationDescription}
            className={cx([
              `${blockClass}__illustration`,
              `${blockClass}__illustration--${size}`,
            ])}
            aria-hidden="true"
          />
        )}
        <EmptyStateContent
          action={action}
          link={link}
          size={size}
          headingAs={headingAs}
          subtitle={subtitle}
          title={title ?? ''}
        />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

EmptyState.propTypes = {
  /**
   * Empty state action button
   */
  action: PropTypes.shape({
    /**@ts-ignore*/
    ...Button.propTypes,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**@ts-ignore*/
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
   * Empty state illustration, specify the `src` for a provided illustration to be displayed. In the case of requiring a light and dark illustration of your own, simply pass the corresponding illustration based on the current theme of your application.
   * For example: `illustration={appTheme === 'dark' ? darkIllustration : lightIllustration}`
   */
  illustration: PropTypes.string,

  /**
   * The alt text for custom provided illustrations
   */
  /**@ts-ignore*/
  illustrationDescription: PropTypes.string,

  /**
   * Designates the position of the illustration relative to the content
   */
  illustrationPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Empty state link object
   */
  /**@ts-ignore*/
  link: PropTypes.any,
  /**
   * Empty state size
   */
  size: PropTypes.oneOf(['lg', 'sm']),

  /**
   * Empty state subtext
   */
  subtitle: PropTypes.node,

  /**
   * Empty state heading
   */
  title: PropTypes.node.isRequired,
  /**
   * **Deprecated:** Designates which version of the EmptyState component is being used. Refer to V2 documentation separately.
   * @deprecated
   */
  v2: PropTypes.bool,
};

EmptyState.displayName = componentName;
