/**
 * Copyright IBM Corp. 2016, 2023
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
} from 'react';
import classNames from 'classnames';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';
import { Tooltip } from '../Tooltip';
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
  slug?: ReactNode;

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

const OperationalTag = <T extends React.ElementType>({
  className,
  disabled,
  id,
  renderIcon,
  slug,
  size,
  text,
  type = 'gray',
  ...other
}: OperationalTagProps<T>) => {
  const prefix = usePrefix();
  const tagId = id || `tag-${getInstanceId()}`;
  const tagClasses = classNames(`${prefix}--tag--operational`, className);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

  const isEllipsisActive = (element: any) => {
    setIsEllipsisApplied(element.offsetWidth < element.scrollWidth);
    return element.offsetWidth < element.scrollWidth;
  };

  useLayoutEffect(() => {
    const elementTagId = document.querySelector(`#${tagId}`);
    const newElement = elementTagId?.getElementsByClassName(
      `${prefix}--tag__label`
    )[0];

    isEllipsisActive(newElement);
  }, [prefix, tagId]);

  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'sm',
      kind: 'inline',
    });
  }

  const tooltipClasses = classNames(
    `${prefix}--icon-tooltip`,
    `${prefix}--tag-label-tooltip`
  );

  if (isEllipsisApplied) {
    return (
      <Tooltip
        label={text}
        align="bottom"
        className={tooltipClasses}
        leaveDelayMs={0}
        onMouseEnter={false}
        closeOnActivation>
        <Tag<any>
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
          {normalizedSlug}
        </Tag>
      </Tooltip>
    );
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
      {normalizedSlug}
      <Text title={text} className={`${prefix}--tag__label`}>
        {text}
      </Text>
    </Tag>
  );
};

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
