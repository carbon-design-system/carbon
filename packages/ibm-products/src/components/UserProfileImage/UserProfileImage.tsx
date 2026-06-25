/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../global/js/utils/props-helper';

// Carbon and package components we use.
import { Group, User } from '@carbon/react/icons';
import { PopoverAlignment, Tooltip, usePrefix } from '@carbon/react';

import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
// Other standard imports.
import PropTypes from 'prop-types';
// Import portions of React that are needed.
import React from 'react';
import { TooltipTrigger } from '../TooltipTrigger';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--user-profile-image`;
const componentName = 'UserProfileImage';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

type Size = 'xl' | 'lg' | 'md';
type Theme = 'light' | 'dark';

type imageProps =
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

type UserProfileImageBaseProps = {
  /**
   * The background color passed should match one of the background colors in the library documentation:
   * https://pages.github.ibm.com/carbon/ibm-products/patterns/user-profile-images/
   */
  backgroundColor?: string;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Provide a custom icon to use if you need to use an icon other than the included ones
   */
  icon?: () => CarbonIconType | null;

  /**
   * When passing the initials prop, either send the initials to be used or the user's display name. The first two capital letters of the display name will be used as the initials.
   */
  initials?: string;

  /**
   * When passing the kind prop, use either "user" or "group". The values match up to the Carbon Library icons.
   */
  kind?: 'user' | 'group';

  /**
   * Set the size of the avatar circle
   */
  size: 'xl' | 'lg' | 'md';

  /**
   * Set theme in which the component will be rendered
   */
  theme: 'light' | 'dark';

  /**
   * Specify how the trigger should align with the tooltip
   */
  tooltipAlignment?: PopoverAlignment;

  /**
   * Pass in the display name to have it shown on hover
   */
  tooltipText?: string;
};

export type UserProfileImageProps = UserProfileImageBaseProps & imageProps;

/**
 * The user profile avatar allows for an image of the user to be displayed by passing in the image prop. By default the component will display a user icon on a blue background.
 * @deprecated This component is deprecated.
 */
export const UserProfileImage = React.forwardRef<
  HTMLDivElement,
  UserProfileImageProps
>((props, ref) => {
  const {
    backgroundColor,
    className,
    kind,
    icon,
    initials,
    image,
    imageDescription,
    size,
    theme,
    tooltipText,
    tooltipAlignment = 'bottom',
    ...rest
  } = props;
  const carbonPrefix = usePrefix();
  const icons = {
    user: {
      md: (props) => <User size={20} {...props} />,
      lg: (props) => <User size={24} {...props} />,
      xl: (props) => <User size={32} {...props} />,
    },
    group: {
      md: (props) => <Group size={20} {...props} />,
      lg: (props) => <Group size={24} {...props} />,
      xl: (props) => <Group size={32} {...props} />,
    },
  };

  const formatInitials = () => {
    if (initials && initials.length === 2) {
      return initials;
    }
    // RegEx takes in the display name and returns the first and last initials. Thomas Watson and Thomas J. Watson
    // both return JW.
    return (
      (initials || '')
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase() || ''
    );
  };

  const getFillItem = () => {
    if (image) {
      return () => (
        <img
          alt={imageDescription}
          src={image}
          className={`${blockClass}__photo ${blockClass}__photo--${size}`}
        />
      );
    }
    if (initials) {
      return formatInitials;
    }
    if (kind && size) {
      return icons[kind][size];
    }
    return icon;
  };

  // if user doesn't provide a color just generate a random one
  const getRandomColor = () => {
    const colors = [
      'light-cyan',
      'dark-cyan',
      'light-gray',
      'dark-gray',
      'light-green',
      'dark-green',
      'light-magenta',
      'dark-magenta',
      'light-purple',
      'dark-purple',
      'light-teal',
      'dark-teal',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const FillItem = getFillItem() as React.ComponentType<any>;

  const renderUserProfileImage = () => (
    <div
      {
        // Pass through any other property values as HTML attributes.
        ...rest
      }
      ref={ref}
      className={cx([
        blockClass,
        className,
        `${blockClass}--${size}`,
        `${blockClass}--${theme}`,
        `${blockClass}--${backgroundColor || getRandomColor()}`,
      ])}
      {...getDevtoolsProps(componentName)}
    >
      <FillItem />
    </div>
  );
  return (
    FillItem &&
    (tooltipText ? (
      <Tooltip
        align={tooltipAlignment}
        label={tooltipText}
        className={`${blockClass}__tooltip ${carbonPrefix}--icon-tooltip`}
      >
        <TooltipTrigger>{renderUserProfileImage()}</TooltipTrigger>
      </Tooltip>
    ) : (
      renderUserProfileImage()
    ))
  );
});

/**@ts-ignore*/
UserProfileImage.deprecated = {
  level: 'warn',
  details: `Please replace ${componentName} with UserAvatar`,
};

// Return a placeholder if not released and not enabled by feature flag

UserProfileImage.displayName = componentName;

UserProfileImage.propTypes = {
  /**
   * The background color passed should match one of the background colors in the library documentation:
   * https://pages.github.ibm.com/carbon/ibm-products/patterns/user-profile-images/
   */
  backgroundColor: PropTypes.oneOf([
    'light-cyan',
    'dark-cyan',
    'light-gray',
    'dark-gray',
    'light-green',
    'dark-green',
    'light-magenta',
    'dark-magenta',
    'light-purple',
    'dark-purple',
    'light-teal',
    'dark-teal',
  ]),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Provide a custom icon to use if you need to use an icon other than the included ones
   */
  icon: PropTypes.func,

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
   * When passing the initials prop, either send the initials to be used or the user's display name. The first two capital letters of the display name will be used as the initials.
   */
  initials: PropTypes.string,

  /**
   * When passing the kind prop, use either "user" or "group". The values match up to the Carbon Library icons.
   */
  kind: PropTypes.oneOf(['user', 'group']),

  /**
   * Set the size of the avatar circle
   */
  size: PropTypes.oneOf<Size>(['xl', 'lg', 'md']).isRequired,

  /**
   * Set theme in which the component will be rendered
   */
  theme: PropTypes.oneOf<Theme>(['light', 'dark']).isRequired,

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
};
