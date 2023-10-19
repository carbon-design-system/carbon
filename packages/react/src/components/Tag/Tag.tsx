/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
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
   * Provide content to be rendered inside of a <Tag>
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the <Tag> is disabled
   */
  disabled?: boolean;

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter?: boolean;

  /**
   * Specify the id for the tag.
   */
  id?: string;

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
  size?: 'sm' | 'md';

  /**
   * Text to show on clear filters
   */
  title?: string;

  /**
   * Specify the type of the <Tag>
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
  filter,
  renderIcon: CustomIconElement,
  title = 'Clear filter',
  disabled,
  onClose,
  size,
  as: BaseComponent,
  ...other
}: TagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const tagClasses = classNames(`${prefix}--tag`, className, {
    [`${prefix}--tag--disabled`]: disabled,
    [`${prefix}--tag--filter`]: filter,
    [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--tag--${type}`]: type,
    [`${prefix}--tag--interactive`]: other.onClick && !filter,
  });

  const typeText =
    type !== undefined && type in Object.keys(TYPES) ? TYPES[type] : '';

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      event.stopPropagation();
      onClose(event);
    }
  };

  if (filter) {
    const ComponentTag = BaseComponent ?? 'div';
    return (
      <ComponentTag className={tagClasses} id={tagId} {...other}>
        <Text
          className={`${prefix}--tag__label`}
          title={typeof children === 'string' ? children : undefined}>
          {children !== null && children !== undefined ? children : typeText}
        </Text>
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
  }

  const ComponentTag = BaseComponent ?? (other.onClick ? 'button' : 'div');

  return (
    <ComponentTag
      disabled={ComponentTag === 'button' ? disabled : null}
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
    </ComponentTag>
  );
};

Tag.propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * wrapping element
   */
  as: PropTypes.elementType,

  /**
   * Provide content to be rendered inside of a <Tag>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the <Tag> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

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
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,

  /**
   * Specify the type of the <Tag>
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default Tag;
