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
import Tag, { SIZES } from './Tag';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';

export interface SelectableTagBaseProps {
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
   * Provide an optional hook that is called when selected is changed
   */
  onChange?: (selected: boolean) => void;

  /**
   * Provide an optional function to be called when the tag is clicked.
   */
  onClick?: (e: Event) => void;

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
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;
}

export type SelectableTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  SelectableTagBaseProps
>;

const SelectableTag = <T extends React.ElementType>({
  className,
  disabled,
  id,
  renderIcon,
  onChange,
  onClick,
  selected = false,
  size,
  text,
  ...other
}: SelectableTagProps<T>) => {
  const prefix = usePrefix();
  const tagRef = useRef<HTMLElement>();
  const tagId = id || `tag-${useId()}`;
  const [selectedTag, setSelectedTag] = useState(selected);
  const tagClasses = classNames(`${prefix}--tag--selectable`, className, {
    [`${prefix}--tag--selectable-selected`]: selectedTag,
  });
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

  const handleClick = (e: Event) => {
    setSelectedTag(!selectedTag);
    onChange?.(!selectedTag);
    onClick?.(e);
  };

  if (isEllipsisApplied) {
    return (
      <Tooltip
        label={text}
        align="bottom"
        className={tooltipClasses}
        leaveDelayMs={0}
        onMouseEnter={() => false}>
        <Tag
          aria-pressed={selectedTag !== false}
          ref={tagRef}
          size={size}
          renderIcon={renderIcon}
          disabled={disabled}
          className={tagClasses}
          id={tagId}
          onClick={handleClick}
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
      aria-pressed={selectedTag !== false}
      ref={tagRef}
      size={size}
      renderIcon={renderIcon}
      disabled={disabled}
      className={tagClasses}
      id={tagId}
      onClick={handleClick}
      {...other}>
      <Text title={text} className={`${prefix}--tag__label`}>
        {text}
      </Text>
    </Tag>
  );
};

SelectableTag.propTypes = {
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
   * Provide an optional hook that is called when selected is changed
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the tag is clicked.
   */
  onClick: PropTypes.func,

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
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,
};

export default SelectableTag;
