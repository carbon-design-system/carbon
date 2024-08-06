/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES, TYPES } from './Tag';
import { Close } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';

export interface DismissibleTagBaseProps {
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
  slug?: ReactNode;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;

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
  className,
  disabled,
  id,
  renderIcon,
  title = 'Dismiss',
  onClose,
  slug,
  size,
  text,
  type,
  ...other
}: DismissibleTagProps<T>) => {
  const prefix = usePrefix();
  const tagLabelRef = useRef<HTMLElement>();
  const tagId = id || `tag-${useId()}`;
  const tagClasses = classNames(`${prefix}--tag--filter`, className);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

  useLayoutEffect(() => {
    const newElement = tagLabelRef.current?.getElementsByClassName(
      `${prefix}--tag__label`
    )[0];
    setIsEllipsisApplied(isEllipsisActive(newElement));
  }, [prefix, tagLabelRef]);
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      event.stopPropagation();
      onClose(event);
    }
  };

  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'AILabel') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
      kind: 'inline',
    });
  }

  const tooltipClasses = classNames(
    `${prefix}--icon-tooltip`,
    `${prefix}--tag-label-tooltip`
  );

  // Removing onClick from the spread operator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick, ...otherProps } = other;

  const dismissLabel = `Dismiss "${text}"`;

  return (
    <Tag
      ref={tagLabelRef}
      type={type}
      size={size}
      renderIcon={renderIcon}
      disabled={disabled}
      className={tagClasses}
      id={tagId}
      {...otherProps}>
      <div className={`${prefix}--interactive--tag-children`}>
        <Text title={text} className={`${prefix}--tag__label`}>
          {text}
        </Text>
        <Tooltip
          label={isEllipsisApplied ? dismissLabel : title}
          align="bottom"
          className={tooltipClasses}
          leaveDelayMs={0}
          closeOnActivation>
          <button
            type="button"
            className={`${prefix}--tag__close-icon`}
            onClick={handleClose}
            disabled={disabled}
            aria-label={title}
            title={title}>
            <Close />
          </button>
        </Tooltip>
        {normalizedSlug}
      </div>
    </Tag>
  );
};
DismissibleTag.propTypes = {
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
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,

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
