/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES, TYPES } from './Tag';
import { Close } from '@carbon/icons-react';

const getInstanceId = setupGetInstanceId();

export interface DismissibleTagBaseProps {
  /**
   * Provide content to be rendered inside of a `DismissibleTag`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `DismissibleTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the id for the selectabletag.
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
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `DismissibleTag` component
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

export type DismissibleTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  DismissibleTagBaseProps
>;

const DismissibleTag = <T extends React.ElementType>({
  children,
  className,
  disabled,
  id,
  renderIcon,
  title = 'Clear filter',
  onClose,
  slug,
  size,
  type,
  ...other
}: DismissibleTagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const tagClasses = classNames(`${prefix}--tag--filter`, className);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      event.stopPropagation();
      onClose(event);
    }
  };

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
      type={type}
      size={size}
      renderIcon={renderIcon}
      disabled={disabled}
      className={tagClasses}
      id={tagId}
      {...otherProps}>
      <div className={`${prefix}--interactive--tag-children`}>
        {children}
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
      </div>
    </Tag>
  );
};
DismissibleTag.propTypes = {
  /**
   * Provide content to be rendered inside of a `DismissibleTag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `DismissibleTag` is disabled
   */
  disabled: PropTypes.bool,

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
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `DismissibleTag` component
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
export default DismissibleTag;
