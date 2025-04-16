/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import deprecate from '../../prop-types/deprecate';
import { DefinitionTooltip } from '../Tooltip';
import { isEllipsisActive } from './isEllipsisActive';
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../internal/PolymorphicProps';
import { SelectableTagBaseProps, SelectableTagProps } from './SelectableTag';
import { OperationalTagBaseProps } from './OperationalTag';
import { DismissibleTagBaseProps } from './DismissibleTag';
import { useMergedRefs } from '../../internal/useMergedRefs';

export const TYPES = {
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

export const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
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
   * **Experimental:** Provide a `decorator` component to be rendered inside the `Tag` component
   */
  decorator?: ReactNode;

  /**
   * Specify if the `Tag` is disabled
   */
  disabled?: boolean;

  /**
   * @deprecated The `filter` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  filter?: boolean;

  /**
   * Specify the id for the tag.
   */
  id?: string;

  /**
   * @deprecated The `onClose` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug?: ReactNode;

  /**
   * @deprecated The `title` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  title?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type TagProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, TagBaseProps>;

type TagComponent = <T extends React.ElementType = 'div'>(
  props:
    | TagProps<T>
    | OperationalTagBaseProps
    | SelectableTagBaseProps
    | DismissibleTagBaseProps
) => React.ReactElement | any;

const TagBase = React.forwardRef<
  any,
  TagBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      children,
      className,
      decorator,
      id,
      type,
      filter, // remove filter in next major release - V12
      renderIcon: CustomIconElement,
      title = 'Clear filter', // remove title in next major release - V12
      disabled,
      onClose, // remove onClose in next major release - V12
      size,
      as: BaseComponent,
      slug,
      ...other
    },
    forwardRef
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLElement>(null);
    if (filter) {
      console.warn(
        'The `filter` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
      );
    }

    if (onClose) {
      console.warn(
        'The `onClose` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
      );
    }
    const ref = useMergedRefs([forwardRef, tagRef]);
    const tagId = id || `tag-${useId()}`;
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];
      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagRef]);

    const conditions = [
      `${prefix}--tag--selectable`,
      `${prefix}--tag--filter`,
      `${prefix}--tag--operational`,
    ];

    const isInteractiveTag = conditions.some((el) => className?.includes(el));

    const tagClasses = classNames(`${prefix}--tag`, className, {
      [`${prefix}--tag--disabled`]: disabled,
      [`${prefix}--tag--filter`]: filter,
      [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}--tag--${type}`]: type,
      [`${prefix}--tag--interactive`]:
        other.onClick && !isInteractiveTag && isEllipsisApplied,
    });

    const typeText =
      type !== undefined && type in Object.keys(TYPES) ? TYPES[type] : '';

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClose) {
        event.stopPropagation();
        onClose(event);
      }
    };

    // AILabel is always size `sm` and `inline`
    let normalizedDecorator = React.isValidElement(slug ?? decorator)
      ? (slug ?? decorator)
      : null;
    if (
      normalizedDecorator &&
      normalizedDecorator['type']?.displayName === 'AILabel' &&
      !isInteractiveTag
    ) {
      normalizedDecorator = React.cloneElement(
        normalizedDecorator as React.ReactElement<any>,
        {
          size: 'sm',
          kind: 'inline',
        }
      );
    }

    if (filter) {
      const ComponentTag = (BaseComponent as React.ElementType) ?? 'div';
      return (
        <ComponentTag className={tagClasses} id={tagId} {...other}>
          {CustomIconElement && size !== 'sm' ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}

          <Text
            title={typeof children === 'string' ? children : undefined}
            className={`${prefix}--tag__label`}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedDecorator}
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

    const ComponentTag =
      BaseComponent ??
      (other.onClick || className?.includes(`${prefix}--tag--operational`)
        ? 'button'
        : 'div');

    const labelClasses = classNames({
      [`${prefix}--tag__label`]: !isInteractiveTag,
    });

    return (
      <ComponentTag
        ref={ref}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        type={ComponentTag === 'button' ? 'button' : undefined}
        {...other}>
        {CustomIconElement && size !== 'sm' ? (
          <div className={`${prefix}--tag__custom-icon`}>
            <CustomIconElement />
          </div>
        ) : (
          ''
        )}
        {isEllipsisApplied && !isInteractiveTag ? (
          <DefinitionTooltip
            openOnHover={false}
            definition={
              children !== null && children !== undefined ? children : typeText
            }
            className={`${prefix}--definition--tooltip--tag`}>
            <Text
              title={
                children !== null &&
                children !== undefined &&
                typeof children === 'string'
                  ? children
                  : typeText
              }
              className={labelClasses}>
              {children !== null && children !== undefined
                ? children
                : typeText}
            </Text>
          </DefinitionTooltip>
        ) : (
          <Text
            title={
              children !== null &&
              children !== undefined &&
              typeof children === 'string'
                ? children
                : typeText
            }
            className={labelClasses}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
        )}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--tag__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </ComponentTag>
    );
  }
);
const Tag = TagBase as TagComponent;
(Tag as React.FC).propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * wrapping element
   */
  as: PropTypes.elementType,

  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `Tag` component
   */
  decorator: PropTypes.node,

  /**
   * Specify if the `Tag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if `Tag` is a filter/chip
   */
  filter: deprecate(
    PropTypes.bool,
    'The `filter` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Click handler for filter tag close button.
   */
  onClose: deprecate(
    PropTypes.func,
    'The `onClose` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

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
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Text to show on clear filters
   */
  title: deprecate(
    PropTypes.string,
    'The `title` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default Tag;
