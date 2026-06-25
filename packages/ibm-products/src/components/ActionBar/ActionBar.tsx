//
// Copyright IBM Corp. 2020, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Import portions of React that are needed.
import React, {
  useRef,
  PropsWithChildren,
  Ref,
  ForwardedRef,
  RefObject,
} from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { Button, ButtonProps } from '@carbon/react';
import uuidv4 from '../../global/js/utils/uuidv4';
import { prepareProps } from '../../global/js/utils/props-helper';
import { ActionBarItem } from './ActionBarItem';
import { ActionBarOverflowItems } from './ActionBarOverflowItems';
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
import { useOverflowItems } from '../../global/js/hooks/useOverflowItems';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--action-bar`;
const componentName = 'ActionBar';

// Default values for props
const defaults = {
  actions: Object.freeze([]),
};

interface Action extends ButtonProps<React.ElementType> {
  id?: string;
  key: string;
  iconDescription: string;
  label: string;
  onClick?: () => void;
  renderIcon: CarbonIconType;
}

interface ActionBarProps extends PropsWithChildren {
  /**
   * Specifies the action bar items. Each item is specified as an object
   * with required fields: key for array rendering, renderIcon, iconDescription and
   * label to provide the icon to display,
   * and optional 'onClick' to receive notifications when the button is clicked.
   * Additional fields in the object will be passed to the
   * Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props.
   *
   * Note that the Button props 'kind', 'size',
   * 'tooltipPosition', 'tooltipAlignment' and 'type' are ignored, as these
   * cannot be used for an action bar item.
   *
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions?: readonly Action[];
  // expects action bar item as array or in fragment,
  /**
   * className
   */
  className?: string;
  /**
   * maxVisible : Maximum action bar items visible before going into the overflow menu
   */
  maxVisible?: number;
  /**
   * class name applied to the overflow options
   */
  menuOptionsClass?: string;
  /**
   * onItemCountChange - event reporting maxWidth
   */
  onWidthChange?: (sizes?: { minWidth?: number; maxWidth?: number }) => void;
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: string;
  /**
   * overflowMenuRef for the overflow menu width that is needed to calculate the width of the action bar with overflow
   */
  overflowMenuRef?: ForwardedRef<HTMLDivElement>;
  /**
   * align tags to right of available space
   */
  rightAlign?: boolean;
}

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * The ActionBar is used internally by the PageHeader to wrap ActionBarItems.
 */
export const ActionBar = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      actions = defaults.actions,
      className,
      maxVisible,
      menuOptionsClass,
      onWidthChange,
      overflowAriaLabel,
      overflowMenuRef,
      rightAlign,

      // Collect any other property values passed in.
      ...rest
    }: ActionBarProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const internalId = useRef(uuidv4());
    const refDisplayedItems = useRef<HTMLDivElement>(null);
    const backupRef = useRef<HTMLDivElement>(null);
    const localRef = (ref || backupRef) as RefObject<HTMLDivElement>;
    const _offsetRef = useRef<HTMLElement>(null);
    const offsetRef = (overflowMenuRef ||
      _offsetRef) as RefObject<HTMLElement | null>;
    const _items = actions.map((action) => ({ id: action?.key, ...action }));
    const { visibleItems, hiddenItems, itemRefHandler, offsetRefHandler } =
      useOverflowItems(_items, localRef, offsetRef, maxVisible, onWidthChange);

    const overflowMenuItems = hiddenItems?.map(({ id: key, ...rest }) => (
      <ActionBarItem {...rest} key={key} />
    ));

    return (
      <div {...rest} className={cx([blockClass, className])} ref={localRef}>
        <div
          ref={refDisplayedItems}
          className={cx([
            `${blockClass}__displayed-items`,
            { [`${blockClass}__displayed-items--right`]: rightAlign },
          ])}
        >
          {visibleItems.map(({ key, id, ...rest }) => (
            <ActionBarItem
              {...{
                id,
                ...rest,
              }}
              key={key}
              ref={(node) => {
                itemRefHandler(id, node);
              }}
            />
          ))}
          {overflowMenuItems?.length > 0 && (
            <ActionBarOverflowItems
              menuOptionsClass={menuOptionsClass}
              overflowAriaLabel={overflowAriaLabel}
              overflowMenuRef={(node) =>
                (offsetRef.current = offsetRefHandler(node))
              }
              overflowItems={overflowMenuItems}
              key={`overflow-menu-${internalId.current}`}
            />
          )}
        </div>
      </div>
    );
  }
);

ActionBar.displayName = componentName;
ActionBar.propTypes = {
  /**
   * Specifies the action bar items. Each item is specified as an object
   * with required fields: key for array rendering, renderIcon, iconDescription and
   * label to provide the icon to display,
   * and optional 'onClick' to receive notifications when the button is clicked.
   * Additional fields in the object will be passed to the
   * Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props.
   *
   * Note that the Button props 'kind', 'size',
   * 'tooltipPosition', 'tooltipAlignment' and 'type' are ignored, as these
   * cannot be used for an action bar item.
   *
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  /**@ts-ignore */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      /**@ts-ignore */
      ...prepareProps(Button.propTypes, [
        // props not desired from Button.propTypes
        'kind',
        'size',
        'tooltipPosition',
        'tooltipAlignment',
      ]),
      id: PropTypes.string,
      // Additional props
      key: PropTypes.string.isRequired,
      // Redefine as form different  to Button and a key prop used by ActionBarItems
      iconDescription: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      /**@ts-ignore */
      renderIcon: Button.propTypes.renderIcon.isRequired,
      // We duplicate onClick here to improve DocGen in Storybook
      onClick: PropTypes.func,
    })
  ),
  // expects action bar item as array or in fragment,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * maxVisible : Maximum action bar items visible before going into the overflow menu
   */
  maxVisible: PropTypes.number,
  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,
  /**
   * onItemCountChange - event reporting maxWidth
   */
  onWidthChange: PropTypes.func,
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes.string.isRequired,
  /**
   * overflowMenuRef for the overflow menu width that is needed to calculate the width of the action bar with overflow
   */
  /**@ts-ignore */
  overflowMenuRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.elementType }),
    PropTypes.object,
  ]),
  /**
   * align tags to right of available space
   */
  rightAlign: PropTypes.bool,
};
