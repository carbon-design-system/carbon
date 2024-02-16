/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { Text } from '../Text';

const getInstanceId = setupGetInstanceId();
const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline',
};

export interface TagBaseProps {
  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `Tag` is disabled
   */
  disabled?: boolean;

  /**
   * Determine if `Tag` is a filter/chip
   */
  filter?: boolean;

  /**
   * Specify the id for the tag.
   */
  id?: string;

  /**
   * Specify what Tag component should be rendered
   */
  interactivetype?: 'read-only' | 'selectable' | 'operational' | 'dismissible';

  /**
   * Click handler for filter tag close button.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional prop to render a custom icon.
   * Can be a React component class
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * 'md' (default) sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug?: ReactNodeLike;

  /**
   * Text to show on clear filters
   */
  title?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type TagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  TagBaseProps
>;

const Tag = <T extends React.ElementType>({
  children,
  className,
  id,
  type,
  renderIcon: CustomIconElement,
  title = 'Clear filter',
  disabled,
  onClose,
  interactivetype = 'read-only',
  selected = false,
  size,
  slug,
  ...other
}: TagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const [selectedTag, setSelectedTag] = useState(selected);
  const tagClasses = classNames(`${prefix}--tag`, className, {
    [`${prefix}--tag--disabled`]: disabled,
    [`${prefix}--tag--filter`]: interactivetype === 'dismissible',
    [`${prefix}--tag--selectable`]: interactivetype === 'selectable',
    [`${prefix}--tag--operational`]: interactivetype === 'operational',
    [`${prefix}--tag--selectable-selected`]: selectedTag,
    [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--tag--${type}`]: type && interactivetype !== 'selectable',
  });

  const typeText =
    type !== undefined && type in Object.keys(TYPES) ? TYPES[type] : '';

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      event.stopPropagation();
      onClose(event);
    }
  };

  // Slug is always size `md` and `inline`
  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
      kind: 'inline',
    });
  }

  const ComponentTag =
    interactivetype === 'dismissible' || interactivetype === 'read-only'
      ? 'div'
      : 'button';
  switch (interactivetype) {
    case 'selectable':
      return (
        <ComponentTag
          disabled={disabled}
          className={tagClasses}
          id={tagId}
          onClick={() => setSelectedTag(!selectedTag)}
          {...other}>
          {CustomIconElement ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}
          <Text title={typeof children === 'string' ? children : undefined}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedSlug}
        </ComponentTag>
      );

    case 'operational':
      return (
        <ComponentTag
          disabled={disabled}
          className={tagClasses}
          id={tagId}
          {...other}>
          {CustomIconElement ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}
          <Text title={typeof children === 'string' ? children : undefined}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedSlug}
        </ComponentTag>
      );

    case 'dismissible':
      return (
        <ComponentTag className={tagClasses} id={tagId} {...other}>
          {CustomIconElement ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}
          <Text
            className={`${prefix}--tag__label`}
            title={typeof children === 'string' ? children : undefined}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedSlug}
          <button
            type="button"
            className={`${prefix}--tag__close-icon`}
            onClick={handleClose}
            disabled={disabled}
            aria-label={title}
            title={title}>
            <Close />
          </button>
        </ComponentTag>
      );

    default:
      return (
        <ComponentTag
          disabled={disabled}
          className={tagClasses}
          id={tagId}
          {...other}>
          {CustomIconElement ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}
          <Text title={typeof children === 'string' ? children : undefined}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedSlug}
        </ComponentTag>
      );
  }
};

Tag.propTypes = {
  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `Tag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if `Tag` is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Specify what Tag component should be rendered
   */
  interactivetype: PropTypes.oneOf([
    'read-only',
    'selectable',
    'operational',
    'dismissible',
  ]),

  /**
   * Click handler for filter tag close button.
   */
  onClose: PropTypes.func,

  /**
   * Optional prop to render a custom icon.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * 'md' (default) sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug: PropTypes.node,

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default Tag;
