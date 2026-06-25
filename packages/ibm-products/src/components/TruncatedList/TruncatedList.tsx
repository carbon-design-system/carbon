/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, {
  Children,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { Button, usePrefix } from '@carbon/react';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { useIsomorphicEffect } from '../../global/js/hooks';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--truncated-list`;
const componentName = 'TruncatedList';

const defaults = {
  as: 'ul',
  collapsedItemsLimit: 5,
  expandedItemsLimit: 10,
  onClick: () => {},
  viewLessLabel: 'View less',
  viewMoreLabel: (value: number) => `View more (${value})`,
};

export interface TruncatedListProps extends PropsWithChildren {
  as?: React.ElementType | string;
  /**
   * Optional class name for expand/collapse button.
   */
  buttonClassName?: string;
  /**
   * The contents of the TruncatedList.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Number of items to render and display when the list is truncated and collapsed.
   * Scrolling is not enabled when collapsed. The smallest number is 1.
   */
  collapsedItemsLimit?: number;
  /**
   * Maximum number of items to show when the list is expanded. All
   * items are rendered when the list is expanded. Scrolling is enabled
   * if there are more items to display than this number.
   */
  expandedItemsLimit?: number;
  /**
   * Optional callback reports the collapsed state of the list.
   */
  onClick?: (value: any) => void;
  /**
   * Text label for when the list is expanded.
   */
  viewLessLabel?: string;
  /**
   * Callback function for building the label when the list is collapsed.
   */
  viewMoreLabel?: (value: number) => ReactNode;
}
/**
 * The `TruncatedList` allows consumers to control how many items are
 * revealed to the user while giving the user the ability to expand
 * and see the entire list.
 */
export const TruncatedList = React.forwardRef<
  HTMLDivElement,
  TruncatedListProps
>(
  (
    {
      children,
      className,
      as: List = defaults.as,
      buttonClassName,
      collapsedItemsLimit = defaults.collapsedItemsLimit,
      expandedItemsLimit = defaults.expandedItemsLimit,
      onClick = defaults.onClick,
      viewLessLabel = defaults.viewLessLabel,
      viewMoreLabel = defaults.viewMoreLabel,
      // Collect any other property values passed in.
      ...rest
    }: TruncatedListProps,
    ref
  ) => {
    const childrenArray = Children.toArray(children);
    // Exception handling: minimum number of items is 1.
    const minItems = Math.max(collapsedItemsLimit, 1);
    // Exception handling: maximum number of items is the number of items passed as children.
    const maxItems = Math.min(expandedItemsLimit, childrenArray.length);
    const [isCollapsed, setIsCollapsed] = useState(true);
    // To minimize *initial* animation,
    //   (difference of zero height to component's rendered height)
    // guesstimate the initial height to reduce animation distance.
    //   (difference of the guessed height to rendered height - a few pixels)
    const [listHeight, setListHeight] = useState(minItems * 16);
    const listRef = useRef<HTMLElement | undefined>(undefined);
    const carbonPrefix = usePrefix();

    const handleToggle = () => {
      setIsCollapsed((prev) => !prev);
    };

    useEffect(() => {
      onClick(isCollapsed);
    }, [isCollapsed, onClick]);

    // Calculate height of the list by measuring the height of each item.
    // (E.g. the height of plain text is not the same height as a link.)
    // CSS animation requires an explicitly declared height for when the
    // list is both collapsed and expanded.
    useEffect(() => {
      if (listRef && childrenArray.length > 0) {
        const numItemsToShow = isCollapsed ? minItems : maxItems;
        const items = listRef.current?.childNodes;
        let listHeight = 0;

        for (let index = 0; index < numItemsToShow; index++) {
          if (items && items[index]) {
            const itemElement = items[index] as HTMLElement;
            const height =
              window?.getComputedStyle(itemElement)?.height || '16';
            listHeight += parseInt(height);
          }
        }

        setListHeight(listHeight);
      }
    }, [childrenArray, minItems, maxItems, isCollapsed, listRef]);

    useIsomorphicEffect(() => {
      if (listRef.current) {
        listRef.current.style.height = `${listHeight}px`;
      }
    }, [listHeight]);

    return (
      <div
        {...rest}
        className={cx(
          blockClass,
          className,
          isCollapsed ? `${blockClass}--collapsed` : `${blockClass}--expanded`,
          // If the list is expanded && showing all the items,
          // then disable scrolling using CSS, instead of adding an arbitrary #px to the height of the list.
          !isCollapsed &&
            childrenArray.length <= maxItems &&
            `${blockClass}--expanded-all`
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <List className={`${blockClass}__list`} ref={listRef}>
          {isCollapsed ? childrenArray.slice(0, minItems) : children}
        </List>

        {childrenArray.length > minItems && (
          <Button
            className={cx(
              `${blockClass}__button`,
              `${carbonPrefix}--link`,
              buttonClassName
            )}
            kind="ghost"
            size="sm"
            onClick={handleToggle}
          >
            {isCollapsed
              ? viewMoreLabel(childrenArray.length - minItems)
              : viewLessLabel}
          </Button>
        )}
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
TruncatedList.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
TruncatedList.propTypes = {
  /**
   * The type of list element to render.
   * This could be a `ul`, `ol`, or a custom React component.
   */
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  /**
   * Optional class name for expand/collapse button.
   */
  buttonClassName: PropTypes.string,
  /**
   * The contents of the TruncatedList.
   */
  children: PropTypes.node.isRequired,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Number of items to render and display when the list is truncated and collapsed.
   * Scrolling is not enabled when collapsed. The smallest number is 1.
   */
  collapsedItemsLimit: PropTypes.number,
  /**
   * Maximum number of items to show when the list is expanded. All
   * items are rendered when the list is expanded. Scrolling is enabled
   * if there are more items to display than this number.
   */
  expandedItemsLimit: PropTypes.number,
  /**
   * Optional callback reports the collapsed state of the list.
   */
  onClick: PropTypes.func,
  /**
   * Text label for when the list is expanded.
   */
  viewLessLabel: PropTypes.string,
  /**
   * Callback function for building the label when the list is collapsed.
   */
  viewMoreLabel: PropTypes.func,
};
