//
// Copyright IBM Corp. 2020, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Import portions of React that are needed.
import React, {
  useRef,
  PropsWithChildren,
  ReactElement,
  ForwardedRef,
} from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

// Carbon and package components we use.
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import uuidv4 from '../../global/js/utils/uuidv4';
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';

// The block part of our conventional BEM class names (blockClass__E--M).
import { pkg } from '../../settings';
const blockClass = `${pkg.prefix}--action-bar-overflow-items`;
const componentName = 'ActionBar';

type OverflowItem = {
  label: string;
  onClick: () => void;
  renderIcon: CarbonIconType;
};

interface ActionBarOverflowItemProps extends PropsWithChildren {
  /**
   * className
   */
  className?: string;
  /**
   * class name applied to the overflow options
   */
  menuOptionsClass?: string;
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do not fit.
   */
  overflowAriaLabel?: string;
  /**
   * overflowMenuRef for the overflow menu width that is needed to calculate the width of the action bar with overflow
   */
  overflowMenuRef?: ForwardedRef<HTMLDivElement>;
  /**
   * overflowItems: items to bre shown in the ActionBar overflow menu
   */
  overflowItems?: ReactElement<OverflowItem>[];

  /**
   * Optional tab index
   */
  tabIndex?: number;
}

export const ActionBarOverflowItems = ({
  className,
  menuOptionsClass,
  overflowItems,
  overflowAriaLabel,
  overflowMenuRef,
}: ActionBarOverflowItemProps) => {
  const internalId = useRef(uuidv4());

  return (
    <div ref={overflowMenuRef}>
      <OverflowMenu
        aria-label={overflowAriaLabel}
        className={cx(blockClass, className)}
        direction="bottom"
        flipped
        iconDescription={overflowAriaLabel} // also needs setting to avoid a11y "Accessible name does not match or contain the visible label text"
        menuOptionsClass={cx(`${blockClass}__options`, menuOptionsClass)}
      >
        {React.Children.map(overflowItems, (item, index) => {
          // This uses a copy of a menu item option
          // NOTE: Cannot use a real Tooltip icon below as it uses a <button /> the
          // div equivalent below is based on Carbon 10.25.0
          const ItemIcon = item?.props.renderIcon as React.ComponentType<any>;
          return (
            <OverflowMenuItem
              className={`${blockClass}__item`}
              onClick={item?.props.onClick}
              itemText={
                <div
                  className={`${blockClass}__item-content`}
                  aria-describedby={`${internalId.current}-${index}--item-label`}
                >
                  <span
                    className={`${blockClass}__item-label`}
                    id={`${internalId.current}-${index}--item-label`}
                  >
                    {item?.props.label}
                  </span>
                  {typeof item?.props.renderIcon === 'function' ? (
                    <ItemIcon />
                  ) : (
                    item?.props.renderIcon
                  )}
                </div>
              }
            />
          );
        })}
      </OverflowMenu>
    </div>
  );
};

ActionBarOverflowItems.displayName = componentName;

ActionBarOverflowItems.propTypes = {
  // expects action bar item as array or in fragment,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes.string,

  /**
   * overflowItems: items to bre shown in the ActionBar overflow menu
   */
  overflowItems: PropTypes.arrayOf(PropTypes.element),

  /**
   * overflowMenuRef for the overflow menu width that is needed to calculate the width of the action bar with overflow
   */
  /**@ts-ignore */
  overflowMenuRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.elementType }),
    PropTypes.object,
    PropTypes.func,
  ]),

  /**
   * Optional tab index
   */
  tabIndex: PropTypes.number,
};
