import React, { ForwardedRef, ElementType, WeakValidationMap } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link, { LinkProps } from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';

export type SwitcherItemProps<E extends ElementType> = LinkProps<E> & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  children: React.ReactNode;
  isSelected: boolean;
  expanded: boolean;
  tabIndex?: number;
  index: number;
  handleSwitcherItemFocus?: (event: {
    currentIndex: number;
    direction: number;
  }) => void;
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
      [customClassName!]: !!customClassName,
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
          currentIndex: index,
          direction: 1,
        });
      }
      if (match(evt, keys.ArrowUp)) {
        evt.preventDefault();
        handleSwitcherItemFocus?.({
          currentIndex: index,
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
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  handleSwitcherItemFocus: PropTypes.func,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default SwitcherItem;
