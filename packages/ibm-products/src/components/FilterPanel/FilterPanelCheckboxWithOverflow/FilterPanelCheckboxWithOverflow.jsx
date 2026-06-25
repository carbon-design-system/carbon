/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { OverflowMenu } from '@carbon/react';
import { FilterPanelCheckbox } from '../FilterPanelCheckbox';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel-checkbox-with-overflow`;
const componentName = 'FilterPanelCheckboxWithOverflow';

const defaults = {
  overflowMenuProps: {},
};

/**
 * Provides a filter panel checkbox with an overflow menu.
 *
 * This component's props refer to the Carbon Checkbox,
 * just like FilterPanelCheckbox.
 *
 * Use `overflowMenuProps` for properties specific to the OverflowMenu.
 * @deprecated This component is deprecated
 */
export let FilterPanelCheckboxWithOverflow = React.forwardRef(
  (
    {
      children,
      className,
      count,
      id,
      labelText,
      overflowMenuProps = defaults.overflowMenuProps,
      title,
      ...rest
    },
    ref
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [showMenuButton, setShowMenuButton] = useState(false);
    // Destructure overflow menu properties.
    const { ...other } = overflowMenuProps;

    const backupRef = useRef(undefined);
    const localRef = ref || backupRef;

    const setHideButton = (activeElement) => {
      if (!menuIsOpen && !localRef.current.contains(activeElement)) {
        setShowMenuButton(false);
      }
    };

    useEffect(() => {
      setShowMenuButton(menuIsOpen);
    }, [menuIsOpen]);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={cx(blockClass, className, {
          [`${blockClass}--open`]: menuIsOpen,
        })}
        onBlur={({ relatedTarget }) => setHideButton(relatedTarget)}
        onFocus={() => setShowMenuButton(true)}
        /**
         * Desired behavior: onMouseEnter shows the menu, even when the user mouse-presses and -releases the checkbox/label.
         * Issue: onMouseDown > checkbox/label triggers an onBlur event and hides the menu button.
         *   Releasing the mouse button then shows the button again.
         *   This behavior "flickers" the menu button.
         * Solution: onMouseDown > preventDefault prevents onBlur from being called.
         *   The menu button remains visible at all times.
         *   This applies only when using the mouse; it is not an issue using the keyboard.
         */
        onMouseDown={(event) => event.preventDefault()}
        onMouseEnter={() => setShowMenuButton(true)}
        onMouseLeave={() => setHideButton(document.activeElement)}
        ref={localRef}
        {...getDevtoolsProps(componentName)}
      >
        <FilterPanelCheckbox
          {...rest}
          className={cx(`${blockClass}__checkbox`)}
          count={count}
          id={id}
          labelText={labelText}
          title={title}
        />

        {showMenuButton && (
          <OverflowMenu
            open={overflowMenuProps?.open}
            className={cx(
              `${blockClass}__overflow-button`,
              overflowMenuProps?.menuClass
            )}
            menuOptionsClass={cx(
              `${blockClass}__overflow-options`,
              overflowMenuProps?.menuOptionsClass
            )}
            aria-label={overflowMenuProps?.['aria-label']}
            iconDescription={overflowMenuProps?.['aria-label']}
            onOpen={() => setMenuIsOpen(true)}
            onClose={() => setMenuIsOpen(false)}
            flipped={overflowMenuProps?.flipped || true}
            selectorPrimaryFocus={overflowMenuProps?.selectorPrimaryFocus}
            {...other}
          >
            {children}
          </OverflowMenu>
        )}
      </div>
    );
  }
);

FilterPanelCheckboxWithOverflow.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
FilterPanelCheckboxWithOverflow = pkg.checkComponentEnabled(
  FilterPanelCheckboxWithOverflow,
  componentName
);

FilterPanelCheckboxWithOverflow.displayName = componentName;

FilterPanelCheckboxWithOverflow.propTypes = {
  /**
   * Children containing `OverflowMenuItems`.
   */
  children: PropTypes.node.isRequired,

  /**
   * Optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Number to be displayed with the checkbox.
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Unique identifier.
   */
  id: PropTypes.string.isRequired,

  /**
   * Label to be displayed with the checkbox.
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Checkbox event handler.
   */
  onChange: PropTypes.func,

  /**
   * Props specific to the internal `OverflowMenu` component.
   */
  overflowMenuProps: PropTypes.shape({
    ['aria-label']: PropTypes.string,
    flipped: PropTypes.bool,
    menuClass: PropTypes.string,
    menuOptionsClass: PropTypes.string,
    open: PropTypes.bool,
    selectorPrimaryFocus: PropTypes.string,
  }),

  /**
   * Optional title attribute for the label.
   */
  title: PropTypes.string,
};
