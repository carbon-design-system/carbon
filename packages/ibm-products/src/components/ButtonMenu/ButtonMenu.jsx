/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { Button, OverflowMenu, usePrefix } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--button-menu`;
const componentName = 'ButtonMenu';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values for props
const defaults = {
  size: 'lg',
  kind: 'primary',
};

/**
 * Combining a standard button with an overflow menu, this component appears
 * as a button and has all the usual carbon Button props and rendering, but
 * acts as an overflow menu when clicked. The ButtonMenu component can contain
 * zero to many ButtonMenuItem, which is identical to the carbon
 * OverflowMenuItem component.
 */
export let ButtonMenu = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      children,
      className,
      iconDescription,
      kind = defaults.kind,
      label,
      menuAriaLabel,
      menuOptionsClass,
      renderIcon: Icon,
      size = defaults.size,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const carbonPrefix = usePrefix();
    return (
      <OverflowMenu
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          `${carbonPrefix}--btn--${size}`,
          {
            [`${blockClass}__wrapper--${kind}`]: kind,
          }
        )}
        aria-label={menuAriaLabel}
        menuOptionsClass={cx(`${blockClass}__options`, menuOptionsClass)}
        size={size}
        renderIcon={() => (
          <div className={cx(`${blockClass}__trigger`)}>
            {label}
            {Icon && (
              <Icon
                aria-hidden="true"
                aria-label={iconDescription}
                className={`${carbonPrefix}--btn__icon`}
              />
            )}
          </div>
        )}
        innerRef={ref}
      >
        {children}
      </OverflowMenu>
    );
  }
);

ButtonMenu.deprecated = {
  level: 'warn',
  details: `Please replace ${componentName} with Carbon's MenuButton`,
};

// Return a placeholder if not released and not enabled by feature flag
ButtonMenu = pkg.checkComponentEnabled(ButtonMenu, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
ButtonMenu.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ButtonMenu.propTypes = {
  /**
   * Provide the contents of the ButtonMenu. This should be one or more
   * ButtonMenuItem components.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: Button.propTypes.iconDescription,

  /**
   * The three types the menu button supports: primary, tertiary and ghost.
   */
  kind: PropTypes.oneOf(['primary', 'tertiary', 'ghost']),

  /**
   * The button label for the menu trigger.
   */
  label: PropTypes.node,

  /**
   * Provide the ariaLabel prop to be passed to the OverflowMenu. This is distinctly
   * separate from `label` to support icon only ButtonMenus
   */
  menuAriaLabel: PropTypes.string.isRequired,

  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: Button.propTypes.renderIcon,

  /**
   * The size of the button for the menu trigger.
   * The menu button supports: sm, md, lg
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
