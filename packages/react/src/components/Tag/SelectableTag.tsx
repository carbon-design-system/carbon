/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';

const getInstanceId = setupGetInstanceId();

export interface SelectableTagBaseProps {
  /**
   * Provide content to be rendered inside of a `SelectableTag`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `SelectableTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the id for the selectabletag.
   */
  id?: string;

  /**
   * Optional prop to render a custom icon.
   * Can be a React component class
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the state of the selectable tag.
   */
  selected?: boolean;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `SelectableTag` component
   */
  slug?: ReactNodeLike;
}

export type SelectableTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  SelectableTagBaseProps
>;

const SelectableTag = <T extends React.ElementType>({
  children,
  className,
  disabled,
  id,
  renderIcon,
  selected = false,
  slug,
  size,
  ...other
}: SelectableTagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const [selectedTag, setSelectedTag] = useState(selected);
  const tagClasses = classNames(`${prefix}--tag--selectable`, className, {
    [`${prefix}--tag--selectable-selected`]: selectedTag,
  });

  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
      kind: 'inline',
    });
  }

  // Removing onClick from the spread operator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick, ...otherProps } = other;

  return (
    <Tag<any>
      slug={slug}
      size={size}
      renderIcon={renderIcon}
      disabled={disabled}
      className={tagClasses}
      id={tagId}
      onClick={() => setSelectedTag(!selectedTag)}
      {...otherProps}>
      <div className={`${prefix}--interactive--tag-children`}>
        {children}
        {normalizedSlug}
      </div>
    </Tag>
  );
};

SelectableTag.propTypes = {
  /**
   * Provide content to be rendered inside of a `SelectableTag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `SelectableTag` is disabled
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
   * Specify the state of the selectable tag.
   */
  selected: PropTypes.bool,

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `SelectableTag` component
   */
  slug: PropTypes.node,
};

export default SelectableTag;
