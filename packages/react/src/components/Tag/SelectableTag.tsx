/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useState,
  useRef,
  MouseEvent,
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
import { useControllableState } from '../../internal/useControllableState';
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
   * Specify the id for the selectable tag.
   */
  id?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Provide an optional hook that is called when selected is changed
   */
  onChange?: (selected: boolean) => void;

  /**
   * Provide an optional function to be called when the tag is clicked.
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Specify the state of the selectable tag.
   */
  selected?: boolean;

  /**
   * Specify the default state of the selectable tag.
   */
  defaultSelected?: boolean;

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

const SelectableTag = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      disabled,
      id,
      renderIcon,
      onChange,
      onClick,
      selected,
      size,
      text,
      defaultSelected = false,
      ...other
    }: SelectableTagProps<T>,
    forwardRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLButtonElement>(null);
    const tagId = id || `tag-${useId()}`;
    const [selectedTag, setSelectedTag] = useControllableState({
      value: selected,
      onChange: onChange,
      defaultValue: defaultSelected,
    });
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
    const combinedRef = mergeRefs(tagRef, forwardRef);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelectedTag(!selectedTag);
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
            ref={combinedRef}
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
        ref={combinedRef}
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
  }
);

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
   * A component used to render an icon.
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
   * Specify the default state of the selectable tag.
   */
  defaultSelected: PropTypes.bool,

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
