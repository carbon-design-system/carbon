import React, { ElementType, forwardRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

interface BaseSwitcherItemProps {
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
}

interface SwitcherItemWithAriaLabel extends BaseSwitcherItemProps {
  'aria-label': string;
  'aria-labelledby'?: never;
}

interface SwitcherItemWithAriaLabelledBy extends BaseSwitcherItemProps {
  'aria-label'?: never;
  'aria-labelledby': string;
}

type SwitcherItemProps =
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
          onKeyDown={(evt) => {
            setTabFocus(evt);
            onKeyDown(evt);
          }}
          ref={forwardRef}
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
   * Specify the index of the SwitcherItem
   */
  index: PropTypes.number,
  /**
   * event handlers
   */
  onKeyDown: PropTypes.func,
  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
};

export default SwitcherItem;
