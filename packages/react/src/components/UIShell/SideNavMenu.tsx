/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ForwardedRef,
  ReactNode,
  Ref,
  useContext,
  useState,
} from 'react';
import SideNavIcon from './SideNavIcon';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { SideNavContext } from './SideNav';

interface SideNavMenuProps {
  /**
   * An optional CSS class to apply to the component.
   */
  className?: string;

  /**
   * The content to render within the SideNavMenu component.
   */
  children?: React.ReactNode;

  /**
   * Specifies whether the menu should be expanded by default.
   */
  defaultExpanded?: boolean;

  /**
   * Indicates whether the SideNavMenu is active.
   */
  isActive?: boolean;

  /**
   * Specifies whether the SideNavMenu is in a large variation.
   */
  large?: boolean;

  /**
   * A custom icon to render next to the SideNavMenu title. This can be a function returning JSX or JSX itself.
   */
  renderIcon?: React.ComponentType;

  /**
   * Indicates if the side navigation container is expanded or collapsed.
   */
  isSideNavExpanded?: boolean;

  /**
   * The tabIndex for the button element.
   * If not specified, the default validation will be applied.
   */
  tabIndex?: number;

  // The title for the overall menu name.

  title: string;
}

const SideNavMenu = React.forwardRef<HTMLElement, SideNavMenuProps>(
  function SideNavMenu(
    {
      className: customClassName,
      children,
      defaultExpanded = false,
      isActive = false,
      large = false,
      renderIcon: IconElement,
      isSideNavExpanded,
      tabIndex,
      title,
    },
    ref: ForwardedRef<HTMLElement>
  ) {
    const isRail = useContext(SideNavContext);
    const prefix = usePrefix();
    const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
    const [prevExpanded, setPrevExpanded] = useState<boolean>(defaultExpanded);
    const className = cx({
      [`${prefix}--side-nav__item`]: true,
      [`${prefix}--side-nav__item--active`]:
        isActive || (hasActiveChild(children) && !isExpanded),
      [`${prefix}--side-nav__item--icon`]: IconElement,
      [`${prefix}--side-nav__item--large`]: large,
      [customClassName as string]: !!customClassName,
    });

    if (isSideNavExpanded === false && isExpanded === true) {
      setIsExpanded(false);
      setPrevExpanded(true);
    } else if (isSideNavExpanded === true && prevExpanded === true) {
      setIsExpanded(true);
      setPrevExpanded(false);
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={className}
        onKeyDown={(event) => {
          if (match(event, keys.Escape)) {
            setIsExpanded(false);
          }
        }}>
        <button
          aria-expanded={isExpanded}
          className={`${prefix}--side-nav__submenu`}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          tabIndex={
            tabIndex === undefined
              ? !isSideNavExpanded && !isRail
                ? -1
                : 0
              : tabIndex
          }>
          {IconElement && (
            <SideNavIcon>
              <IconElement />
            </SideNavIcon>
          )}
          <span className={`${prefix}--side-nav__submenu-title`}>{title}</span>
          <SideNavIcon className={`${prefix}--side-nav__submenu-chevron`} small>
            <ChevronDown size={20} />
          </SideNavIcon>
        </button>
        <ul className={`${prefix}--side-nav__menu`}>{children}</ul>
      </li>
    );
  }
);
SideNavMenu.displayName = 'SideNavMenu';

SideNavMenu.propTypes = {
  /**
   * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the menu should default to expanded. By default, it will
   * be closed.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
   * considered active if one of its menu items are a link for the current
   * page.
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavMenu
   */
  large: PropTypes.bool,

  /**
   * Pass in a custom icon to render next to the `SideNavMenu` title
   */
  // @ts-expect-error - PropTypes are unable to cover this case.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,

  /**
   * Provide the text for the overall menu name
   */
  title: PropTypes.string.isRequired,
};

/**
Defining the children parameter with the type ReactNode | ReactNode[]. This allows for various possibilities:
a single element, an array of elements, or null or undefined.
**/
function hasActiveChild(children: ReactNode | ReactNode[]): boolean {
  if (Array.isArray(children)) {
    return children.some((child) => {
      if (!React.isValidElement(child)) {
        return false;
      }

      /** Explicitly defining the expected prop types (isActive and 'aria-current) for the children to ensure type
  safety when accessing their props.
  **/
      const props = child.props as {
        isActive?: boolean;
        'aria-current'?: string;
      };

      if (props.isActive === true || props['aria-current']) {
        return true;
      }

      return false;
    });
  }

  // We use React.isValidElement(child) to check if the child is a valid React element before accessing its props

  if (React.isValidElement(children)) {
    const props = children.props as {
      isActive?: boolean;
      'aria-current'?: string;
    };

    if (props.isActive === true || props['aria-current']) {
      return true;
    }
  }

  return false;
}

export default SideNavMenu;
export { SideNavMenu };
