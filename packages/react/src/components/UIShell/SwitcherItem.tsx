/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributeAnchorTarget,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

export interface BaseSwitcherItemProps {
  /**
   * Specify the text content for the link
   */
  children: React.ReactNode;
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;
  /**
   * event handlers
   */
  handleSwitcherItemFocus?: (event: {
    currentIndex: number;
    direction: number;
  }) => void;
  /**
   * Specify the index of the SwitcherItem
   */
  index?: number;
  /**
   * event handlers
   */
  onKeyDown?: (event: KeyboardEvent) => void;
  /**
   * event handlers
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Specify the tab index of the Link
   */
  tabIndex?: number;
  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;
  /**
   * Specify whether the panel is selected
   */
  isSelected?: boolean;
  /**
   * Optionally provide an href for the underlying li`
   */
  href?: string;
  /**
   * Specify where to open the link.
   */
  target?: HTMLAttributeAnchorTarget;
  /**
   * The rel property for the link.
   */
  rel?: string;
}

export interface SwitcherItemWithAriaLabel extends BaseSwitcherItemProps {
  'aria-label': string;
  'aria-labelledby'?: never;
}

export interface SwitcherItemWithAriaLabelledBy extends BaseSwitcherItemProps {
  'aria-label'?: never;
  'aria-labelledby': string;
}

export type SwitcherItemProps =
  | SwitcherItemWithAriaLabel
  | SwitcherItemWithAriaLabelledBy;

const SwitcherItem = forwardRef<ElementType, SwitcherItemProps>(
  function SwitcherItem(props, forwardRef) {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: customClassName,
      children,
      isSelected,
      expanded,
      tabIndex = expanded ? 0 : -1,
      index,
      handleSwitcherItemFocus,
      onKeyDown = () => {},
      href,
      target,
      rel,
      ...rest
    } = props;

    const prefix = usePrefix();
    const classNames = cx(`${prefix}--switcher__item`, {
      [customClassName || '']: !!customClassName,
    });

    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    const linkClassName = cx(`${prefix}--switcher__item-link`, {
      [`${prefix}--switcher__item-link--selected`]: isSelected,
    });

    function setTabFocus(evt: KeyboardEvent) {
      if (match(evt, keys.ArrowDown)) {
        evt.preventDefault();
        handleSwitcherItemFocus?.({
          currentIndex: index || -1,
          direction: 1,
        });
      }
      if (match(evt, keys.ArrowUp)) {
        evt.preventDefault();
        handleSwitcherItemFocus?.({
          currentIndex: index || -1,
          direction: -1,
        });
      }
    }

    return (
      <li className={classNames}>
        <Link
          onKeyDown={(evt: KeyboardEvent<HTMLAnchorElement>) => {
            setTabFocus(evt);
            onKeyDown(evt);
          }}
          href={href}
          target={target}
          rel={rel}
          ref={forwardRef as ForwardedRef<HTMLAnchorElement | any>}
          {...rest}
          className={linkClassName}
          tabIndex={tabIndex}
          {...accessibilityLabel}>
          {children}
        </Link>
      </li>
    );
  }
);

SwitcherItem.displayName = 'SwitcherItem';
SwitcherItem.propTypes = {
  ...AriaLabelPropType,
  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
  /**
   * event handlers
   */
  handleSwitcherItemFocus: PropTypes.func,
  /**
   * Optionally provide an href for the underlying li`
   */
  href: PropTypes.string,
  /**
   * Specify the index of the SwitcherItem
   */
  index: PropTypes.number,
  /**
   * event handlers
   */
  onClick: PropTypes.func,
  /**
   * event handlers
   */
  onKeyDown: PropTypes.func,
  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
  /**
   * Specify where to open the link.
   */
  target: PropTypes.string,
  /**
   * The rel property for the link.
   */
  rel: PropTypes.string,
};

export default SwitcherItem;
