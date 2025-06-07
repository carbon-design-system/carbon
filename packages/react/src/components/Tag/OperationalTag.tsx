/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  MouseEventHandler,
  useLayoutEffect,
  useState,
  ReactNode,
  useRef,
  forwardRef,
  ForwardedRef,
} from 'react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';
import mergeRefs from '../../tools/mergeRefs';

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
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;
  onClick?: MouseEventHandler;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type OperationalTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  OperationalTagBaseProps
>;

const OperationalTag = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      disabled,
      id,
      renderIcon,
      size,
      text,
      type = 'gray',
      ...other
    }: OperationalTagProps<T>,
    forwardRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLButtonElement>(null);
    const tagId = id || `tag-${useId()}`;
    const tagClasses = classNames(`${prefix}--tag--operational`, className);
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];

      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagRef]);

    const tooltipClasses = classNames(
      `${prefix}--icon-tooltip`,
      `${prefix}--tag-label-tooltip`
    );
    const combinedRef = mergeRefs(tagRef, forwardRef);

    if (isEllipsisApplied) {
      return (
        <Tooltip
          label={text}
          align="bottom"
          className={tooltipClasses}
          leaveDelayMs={0}
          onMouseEnter={() => false}
          closeOnActivation>
          <Tag
            ref={combinedRef}
            type={type}
            size={size}
            renderIcon={renderIcon}
            disabled={disabled}
            className={tagClasses}
            id={tagId}
            {...other}>
            <Text title={text} className={`${prefix}--tag__label`}>
              {text}
            </Text>
          </Tag>
        </Tooltip>
      );
    }

    return (
      <Tag
        ref={combinedRef}
        type={type}
        size={size}
        renderIcon={renderIcon}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        {...other}>
        <Text title={text} className={`${prefix}--tag__label`}>
          {text}
        </Text>
      </Tag>
    );
  }
);

OperationalTag.propTypes = {
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
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default OperationalTag;
