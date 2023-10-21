import React, { ForwardedRef, ElementType, WeakValidationMap } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link, { LinkProps } from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';

export type SwitcherItemProps<E extends ElementType> = LinkProps<E> & {
  /**
   * Required props for accessibility label on the underlying item
   */
  'aria-label'?: string;
  /**
   * Required props for accessibility labelledby on the underlying item
   */
  'aria-labelledby'?: string;
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;
  /**
   * Specify the text content for the link
   */
  children: React.ReactNode;
  /**
   * Specify the tab index of the Link
   */
  tabIndex?: number;
  /**
   * Specify the index of the SwitcherItem
   */
  index?: number;
  /**
   * event handlers
   */
  handleSwitcherItemFocus?: (event: {
    currentIndex: number;
    direction: number;
  }) => void;
  /**
   * event handlers
   */
  onKeyDown?: (event: KeyboardEvent) => void;
};

export interface SwitcherItemComponent {
  <E extends ElementType = 'a'>(
    props: SwitcherItemProps<E> & { ref?: ForwardedRef<ElementType> }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<SwitcherItemProps<any>>;
}

const SwitcherItem: SwitcherItemComponent = React.forwardRef(
  function SwitcherItemRenderFunction<E extends ElementType = 'a'>(
    {
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
    }: SwitcherItemProps<E>,
    ref: ForwardedRef<ElementType>
  ) {
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
          ref={ref}
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
  /**
   * Required props for accessibility label on the underlying item
   */
  'aria-label': PropTypes.string,
  /**
   * Required props for accessibility labelledby on the underlying item
   */
  'aria-labelledby': PropTypes.string,
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
