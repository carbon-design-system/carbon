/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import cx from 'classnames';

import { usePrefix } from '../../internal/usePrefix';
import { Tooltip } from '../Tooltip';
import { PopoverAlignment } from '../Popover';
import { User } from '@carbon/icons-react';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

const componentName = 'UserAvatar';

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

export type UserAvatarProps = {
  /**
   * Provide the background color need to be set for UserAvatar.
   */
  backgroundColor?: BackgroundColor;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * When passing the name prop, either send the initials to be used or the
   * user's full name. The first two capital letters of the user's name will be
   * used as the name.
   */
  name?: string;
  /**
   * Provide a custom icon to use if you need to use an icon other than the
   * default one
   */
  renderIcon?: React.ElementType;
  /**
   * Set the size of the avatar circle
   */
  size?: Size;
  /**
   * Specify how the trigger should align with the tooltip
   */
  tooltipAlignment?: PopoverAlignment;
  /**
   * Pass in the display name to have it shown on hover
   */
  tooltipText?: string;
} & ImageProps;

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  (props, ref) => {
    const {
      backgroundColor = 'order-1-cyan',
      className,
      image,
      imageDescription,
      name,
      renderIcon: RenderIcon,
      size = 'md',
      tooltipAlignment = 'bottom',
      tooltipText,
      ...rest
    } = props;

    const prefix = usePrefix();
    const blockClass = `${prefix}--user-avatar`;

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

    const avatarNode = (
      <div
        {...rest}
        className={cx(
          blockClass,
          className,
          `${blockClass}--${backgroundColor}`,
          `${blockClass}--${size}`
        )}
        ref={ref}
        data-component-name={componentName}>
        {getItem()}
      </div>
    );

    if (tooltipText) {
      return (
        <Tooltip
          align={tooltipAlignment}
          label={tooltipText}
          className={`${blockClass}__tooltip ${prefix}--icon-tooltip`}>
          <button
            type="button"
            aria-label={tooltipText}
            className={`${blockClass}__tooltip-trigger`}>
            {avatarNode}
          </button>
        </Tooltip>
      );
    }
    return avatarNode;
  }
);

UserAvatar.displayName = componentName;
