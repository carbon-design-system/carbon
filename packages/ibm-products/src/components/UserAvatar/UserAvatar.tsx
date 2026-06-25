/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';

import { Tooltip, usePrefix } from '@carbon/react';
import { TooltipTrigger } from '../TooltipTrigger';
import { User } from '@carbon/react/icons';
import '../../global/js/utils/props-helper';
// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--user-avatar`;
const componentName = 'UserAvatar';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * TODO: A description of the component.
 */
type BackgroundColor =
  | 'order-1-cyan'
  | 'order-2-gray'
  | 'order-3-green'
  | 'order-4-magenta'
  | 'order-5-purple'
  | 'order-6-teal'
  | 'order-7-cyan'
  | 'order-8-gray'
  | 'order-9-green'
  | 'order-10-magenta'
  | 'order-11-purple'
  | 'order-12-teal';
type Size = 'xl' | 'lg' | 'md' | 'sm';
type TooltipAlignment =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

type ImageProps =
  | {
      /**
       * When passing the image prop, supply a full path to the image to be displayed.
       */
      image: string;
      /**
       * When passing the image prop use the imageDescription prop to describe the image for screen reader.
       */
      imageDescription: string;
    }
  | {
      image?: never;
      imageDescription?: never;
    };

type UserAvatarBaseProps = {
  /**
   * Provide the background color need to be set for UserAvatar.
   */
  backgroundColor?: BackgroundColor;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * When passing the name prop, either send the initials to be used or the user's full name. The first two capital letters of the user's name will be used as the name.
   */
  name?: string;
  /**
   * Provide a custom icon to use if you need to use an icon other than the default one
   */
  renderIcon?: React.ElementType | string;
  /**
   * Set the size of the avatar circle
   */
  size?: Size;
  /**
   * Specify how the trigger should align with the tooltip
   */
  tooltipAlignment?: TooltipAlignment;
  /**
   * Pass in the display name to have it shown on hover
   */
  tooltipText?: string;
};

type UserAvatarProps = UserAvatarBaseProps & ImageProps;

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  (props, ref) => {
    const {
      backgroundColor = 'order-1-cyan',
      className,
      image,
      imageDescription,
      name,
      /* TODO: add other props for UserAvatar, with default values if needed */
      renderIcon: RenderIcon,
      size = 'md',
      tooltipText,
      tooltipAlignment = 'bottom',
      ...rest
    } = props;
    const carbonPrefix = usePrefix();
    const iconSize = {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    };
    const formatInitials = () => {
      const parts = name?.split(' ') || [];
      const firstChar = parts[0].charAt(0).toUpperCase();
      const secondChar = parts[0].charAt(1).toUpperCase();
      if (parts.length === 1) {
        return firstChar + secondChar;
      }
      const lastChar = parts[parts.length - 1].charAt(0).toUpperCase();
      const initials = [firstChar];
      if (lastChar) {
        initials.push(lastChar);
      }
      return ''.concat(...initials);
    };
    const getItem = () => {
      const iconProps = { size: iconSize[size] };
      if (image) {
        return (
          <img
            alt={imageDescription}
            src={image}
            className={`${blockClass}__photo ${blockClass}__photo--${size}`}
          />
        );
      }
      if (RenderIcon) {
        return <RenderIcon {...iconProps} />;
      }
      if (name) {
        return formatInitials();
      }
      return <User {...iconProps} />;
    };

    const Avatar = () => (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          `${blockClass}--${backgroundColor}`,
          `${blockClass}--${size}`,
          // example: `${blockClass}__template-string-class-${kind}-n-${size}`,
          {
            // switched classes dependant on props or state
            // example: [`${blockClass}__here-if-small`]: size === 'sm',
          }
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {getItem()}
      </div>
    );

    if (tooltipText) {
      return (
        <Tooltip
          align={tooltipAlignment}
          label={tooltipText}
          className={`${blockClass}__tooltip ${carbonPrefix}--icon-tooltip`}
        >
          {/**@ts-ignore */}
          <TooltipTrigger>
            <Avatar />
          </TooltipTrigger>
        </Tooltip>
      );
    }
    return <Avatar />;
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
UserAvatar.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
UserAvatar.propTypes = {
  /**
   * Provide the background color need to be set for UserAvatar. Background color will be set based on lighter or darker theme.
   * For example: if you select order-5-purple, it will take $purple-60 for lighter theme and $purple-50 for darker theme.
   */
  backgroundColor: PropTypes.oneOf([
    'order-1-cyan',
    'order-2-gray',
    'order-3-green',
    'order-4-magenta',
    'order-5-purple',
    'order-6-teal',
    'order-7-cyan',
    'order-8-gray',
    'order-9-green',
    'order-10-magenta',
    'order-11-purple',
    'order-12-teal',
  ]),
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * When passing the image prop, supply a full path to the image to be displayed.
   */
  /**@ts-ignore */
  image: PropTypes.string,
  /**
   * When passing the image prop use the imageDescription prop to describe the image for screen reader.
   */
  /**@ts-ignore */
  imageDescription: PropTypes.string,
  /**
   * When passing the name prop, either send the initials to be used or the user's full name. The first two capital letters of the user's name will be used as the name.
   */
  name: PropTypes.string,
  /**
   * Provide a custom icon to use if you need to use an icon other than the default one
   */
  /**@ts-ignore */
  renderIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Set the size of the avatar circle
   */
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm']),
  /**
   * Specify how the trigger should align with the tooltip
   */
  tooltipAlignment: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),
  /**
   * Pass in the display name to have it shown on hover
   */
  tooltipText: PropTypes.string,
  /* TODO: add types and DocGen for all props. */
};
