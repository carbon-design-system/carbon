/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';

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
};

export interface OperationalTagBaseProps {
  /**
   * Provide content to be rendered inside of a `OperationalTag`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `OperationalTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the id for the OperationalTag.
   */
  id?: string;

  /**
   * Optional prop to render a custom icon.
   * Can be a React component class
   */
  renderIcon?: React.ElementType;
  onClick?: MouseEventHandler;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `OperationalTag` component
   */
  slug?: ReactNodeLike;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type OperationalTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  OperationalTagBaseProps
>;

const OperationalTag = <T extends React.ElementType>({
  children,
  className,
  disabled,
  id,
  renderIcon,
  slug,
  size,
  type = 'gray',
  ...other
}: OperationalTagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const tagClasses = classNames(`${prefix}--tag--operational`, className);

  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
      kind: 'inline',
    });
  }

  return (
    <Tag<any>
      type={type}
      size={size}
      renderIcon={renderIcon}
      disabled={disabled}
      className={tagClasses}
      id={tagId}
      {...other}>
      <div className={`${prefix}--interactive--tag-children`}>
        {children}
        {normalizedSlug}
      </div>
    </Tag>
  );
};

OperationalTag.propTypes = {
  /**
   * Provide content to be rendered inside of a `OperationalTag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `OperationalTag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Optional prop to render a custom icon.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `OperationalTag` component
   */
  slug: PropTypes.node,

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default OperationalTag;
