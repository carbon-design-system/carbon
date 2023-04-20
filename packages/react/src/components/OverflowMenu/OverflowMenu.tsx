/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, {
  Component,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ForwardedRef,
  type ComponentType,
} from 'react';
import { isElement } from 'react-is';
import classNames from 'classnames';
import ClickListener from '../../internal/ClickListener';
import { type FocusHandlerOptions } from '../OverflowMenuItem/OverflowMenuItem';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { keys, matches as keyCodeMatches } from '../../internal/keyboard';
import mergeRefs from '../../tools/mergeRefs';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { IconButton } from '../IconButton';

interface OnReturn {
  release(): null;
}
const on = <El extends HTMLElement>(
  element: El,
  ...args: Parameters<El['addEventListener']>
): OnReturn => {
  // eslint-disable-next-line prefer-spread
  element.addEventListener.apply(element, args);
  return {
    release() {
      // eslint-disable-next-line prefer-spread
      element.removeEventListener.apply(element, args);
      return null;
    },
  };
};

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 * @type {Object<string, string>}
 */
const triggerButtonPositionProps = {
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
};

/**
 * Determines how the position of arrow should affect the floating menu position.
 * @type {Object<string, number>}
 */
const triggerButtonPositionFactors = {
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
};

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} direction The floating menu direction.
 * @param {HTMLElement} trigger
 * @param {boolean} flip
 *
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
export const getMenuOffset = (menuBody, direction, trigger, flip) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (__DEV__) {
    invariant(
      triggerButtonPositionProp && triggerButtonPositionFactor,
      '[OverflowMenu] wrong floating menu direction: `%s`',
      direction
    );
  }
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuBody;

  switch (triggerButtonPositionProp) {
    case 'top':
    case 'bottom': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    case 'left':
    case 'right': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerHeight = !trigger ? 0 : trigger.offsetHeight;
      return {
        left: 0,
        top: (!flip ? 1 : -1) * (menuHeight / 2 - triggerHeight / 2),
      };
    }

    default:
      break;
  }
};

type MaybeGetter<T> = T | (() => T);
type Offset = { top: number; left: number };
type IconProps = {
  className?: string;
  'aria-label'?: string;
};

export interface OverflowMenuProps extends HTMLAttributes<HTMLElement> {
  /**
   * The child nodes.
   */
  children?: React.ReactNode;

  /**
   * The menu direction.
   */
  direction: typeof DIRECTION_TOP | typeof DIRECTION_BOTTOM;

  /**
   * `true` if the menu alignment should be flipped.
   */
  flipped?: boolean;

  /**
   * Enable or disable focus trap behavior
   */
  focusTrap?: boolean;

  /**
   * The CSS class for the icon.
   */
  iconClass?: string;

  /**
   * The icon description.
   */
  iconDescription: string;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffset: MaybeGetter<Offset>;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffsetFlip: MaybeGetter<Offset>;

  /**
   * The class to apply to the menu options
   */
  menuOptionsClass?: string;

  /**
   * The event handler for the `click` event.
   */
  onClick(event: MouseEvent): void;

  /**
   * Function called when menu is closed
   */
  onClose(): void;

  /**
   * The event handler for the `focus` event.
   */
  onFocus(): void;

  /**
   * The event handler for the `keydown` event.
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * Function called when menu is opened
   */
  onOpen(): void;

  /**
   * `true` if the menu should be open.
   */
  open?: boolean;

  /**
   * Function called to override icon rendering.
   */
  renderIcon: ComponentType<IconProps>;

  /**
   * Specify a CSS selector that matches the DOM element
   * that should be focused when the OverflowMenu opens
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify the size of the OverflowMenu.
   * Currently, supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: 'sm' | 'md' | 'lg';

  innerRef: ForwardedRef<HTMLElement>;
}

interface State {
  hasMountedTrigger?: boolean;
  prevOpen?: boolean;
  open?: boolean;
}

class OverflowMenuComponent extends Component<OverflowMenuProps, State> {
  readonly state: State = {};

  static propTypes = {
    /**
     * Specify a label to be read by screen readers on the container node
     */
    ['aria-label']: PropTypes.string,

    /**
     * Deprecated, please use `aria-label` instead.
     * Specify a label to be read by screen readers on the container note.
     */
    ariaLabel: deprecate(
      PropTypes.string,
      'This prop syntax has been deprecated. Please use the new `aria-label`.'
    ),

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The menu direction.
     */
    direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

    /**
     * `true` if the menu alignment should be flipped.
     */
    flipped: PropTypes.bool,

    /**
     * Enable or disable focus trap behavior
     */
    focusTrap: PropTypes.bool,

    /**
     * The CSS class for the icon.
     */
    iconClass: PropTypes.string,

    /**
     * The icon description.
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * The element ID.
     */
    id: PropTypes.string,

    /**
     * `true` to use the light version. For use on $ui-01 backgrounds only.
     * Don't use this to make OverflowMenu background color same as container background color.
     */
    light: deprecate(
      PropTypes.bool,
      'The `light` prop for `OverflowMenu` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
    ),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffsetFlip: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The class to apply to the menu options
     */
    menuOptionsClass: PropTypes.string,

    /**
     * The event handler for the `click` event.
     */
    onClick: PropTypes.func,

    /**
     * Function called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * The event handler for the `focus` event.
     */
    onFocus: PropTypes.func,

    /**
     * The event handler for the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * Function called when menu is opened
     */
    onOpen: PropTypes.func,

    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * Function called to override icon rendering.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * Specify a CSS selector that matches the DOM element that should
     * be focused when the OverflowMenu opens
     */
    selectorPrimaryFocus: PropTypes.string,

    /**
     * Specify the size of the OverflowMenu.
     * Currently, supports either `sm`, 'md' (default) or 'lg` as an option.
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  };

  static contextType = PrefixContext;

  static defaultProps = {
    ['aria-label']: null,
    iconDescription: 'Options',
    open: false,
    direction: DIRECTION_BOTTOM,
    flipped: false,
    focusTrap: true,
    renderIcon: OverflowMenuVertical,
    onClick: () => {},
    onKeyDown: () => {},
    onClose: () => {},
    onOpen: () => {},
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
    selectorPrimaryFocus: '[data-overflow-menu-primary-focus]',
  };

  /** The handle of `onfocusin` or `focus` event handler. */
  private _hFocusIn: null | ReturnType<typeof on> = null;

  _menuBody?: HTMLElement;

  /** The timeout handle for handling `blur` event. */
  private _hBlurTimeout;

  /** The element ref of the tooltip's trigger button. */
  private _triggerRef = React.createRef<HTMLButtonElement>();

  componentDidUpdate(_, prevState) {
    const { onClose } = this.props;
    if (!this.state.open && prevState.open) {
      onClose();
    }
  }

  componentDidMount() {
    // ensure that if open=true on first render, we wait
    // to render the floating menu until the trigger ref is not null
    if (this._triggerRef.current) {
      this.setState({ hasMountedTrigger: true });
    }
  }

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  componentWillUnmount() {
    if (typeof this._hBlurTimeout === 'number') {
      clearTimeout(this._hBlurTimeout);
      this._hBlurTimeout = undefined;
    }
  }

  handleClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    if (!this._menuBody || !this._menuBody.contains(evt.target as Node)) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  closeMenuAndFocus = () => {
    const wasOpen = this.state.open;
    this.closeMenu(() => {
      if (wasOpen) {
        this.focusMenuEl();
      }
    });
  };

  handleKeyPress = (evt: KeyboardEvent) => {
    if (
      this.state.open &&
      keyCodeMatches(evt, [
        keys.ArrowUp,
        keys.ArrowRight,
        keys.ArrowDown,
        keys.ArrowLeft,
      ])
    ) {
      evt.preventDefault();
    }

    // Close the overflow menu on escape
    if (keyCodeMatches(evt, [keys.Escape])) {
      this.closeMenuAndFocus();

      // Stop the esc keypress from bubbling out and closing something it shouldn't
      evt.stopPropagation();
    }
  };

  handleClickOutside = (evt: MouseEvent) => {
    if (
      this.state.open &&
      (!this._menuBody || !this._menuBody.contains(evt.target as Node))
    ) {
      this.closeMenu();
    }
  };

  closeMenu = (onCloseMenu?: () => void) => {
    this.setState({ open: false }, () => {
      // Optional callback to be executed after the state as been set to close
      if (onCloseMenu) {
        onCloseMenu();
      }
      this.props.onClose();
    });
  };

  focusMenuEl = () => {
    const { current: triggerEl } = this._triggerRef;
    if (triggerEl) {
      triggerEl.focus();
    }
  };

  /**
   * Focuses the next enabled overflow menu item given
   * the currently focused item index and direction to move
   */
  handleOverflowMenuItemFocus = ({
    currentIndex,
    direction,
  }: FocusHandlerOptions) => {
    const enabledIndices: number[] = [];
    React.Children.forEach(this.props.children, (child, i) => {
      if (isElement(child) && !child.props.disabled) {
        enabledIndices.push(i);
      }
    });

    const nextValidIndex = (() => {
      const nextIndex = enabledIndices.indexOf(currentIndex || 0) + direction;
      switch (nextIndex) {
        case -1:
          return enabledIndices.length - 1;
        case enabledIndices.length:
          return 0;
        default:
          return nextIndex;
      }
    })();

    this[`overflowMenuItem${enabledIndices[nextValidIndex]}`]?.focus();
  };

  /**
   * Handles the floating menu being unmounted or non-floating menu being
   * mounted or unmounted.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _bindMenuBody = (menuBody: HTMLElement) => {
    if (!menuBody) {
      this._menuBody = menuBody;
    }
    if (!menuBody && this._hFocusIn) {
      this._hFocusIn = this._hFocusIn.release();
    }
  };

  /**
   * Handles the floating menu being placed.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _handlePlace = (menuBody) => {
    if (menuBody) {
      this._menuBody = menuBody;
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._hFocusIn = on(
        menuBody.ownerDocument,
        focusinEventName,
        (event) => {
          const target = ClickListener.getEventTarget(event);
          const { current: triggerEl } = this._triggerRef;
          if (typeof target.matches === 'function') {
            if (
              !menuBody.contains(target) &&
              triggerEl &&
              !target.matches(
                `.${this.context}--overflow-menu,.${this.context}--overflow-menu-options`
              )
            ) {
              this.closeMenuAndFocus();
            }
          }
        },
        !hasFocusin
      );
      this.props.onOpen();
    }
  };

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () => {
    const { current: triggerEl } = this._triggerRef;
    return (
      (triggerEl && triggerEl.closest('[data-floating-menu-container]')) ||
      document.body
    );
  };

  render() {
    const prefix = this.context;
    const {
      id,
      ['aria-label']: ariaLabel,
      // @ts-expect-error: deprecated prop
      ariaLabel: deprecatedAriaLabel,
      children,
      iconDescription,
      direction,
      flipped,
      focusTrap,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      onOpen, // eslint-disable-line
      selectorPrimaryFocus = '[data-floating-menu-primary-focus]', // eslint-disable-line
      renderIcon: IconElement,
      // eslint-disable-next-line react/prop-types
      innerRef: ref,
      menuOptionsClass,
      // @ts-expect-error: deprecated prop
      light,
      size = 'md',
      ...other
    } = this.props;

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
        [`${prefix}--overflow-menu--light`]: light,
        [`${prefix}--overflow-menu--${size}`]: size,
      }
    );

    const overflowMenuOptionsClasses = classNames(
      menuOptionsClass,
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu--flip`]: this.props.flipped,
        [`${prefix}--overflow-menu-options--open`]: open,
        [`${prefix}--overflow-menu-options--light`]: light,
        [`${prefix}--overflow-menu-options--${size}`]: size,
      }
    );

    const overflowMenuIconClasses = classNames(
      `${prefix}--overflow-menu__icon`,
      iconClass
    );

    const childrenWithProps: ReactElement[] = [];
    React.Children.forEach(children, (child, index) => {
      if (!isElement(child)) {
        return;
      }

      childrenWithProps.push(
        React.cloneElement(child, {
          closeMenu: child?.props?.closeMenu || this.closeMenuAndFocus,
          handleOverflowMenuItemFocus: this.handleOverflowMenuItemFocus,
          ref: (e) => (this[`overflowMenuItem${index}`] = e),
          index,
        })
      );
    });

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex={-1}
        role="menu"
        aria-label={ariaLabel || deprecatedAriaLabel}
        onKeyDown={this.handleKeyPress}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = (
      <FloatingMenu
        focusTrap={focusTrap}
        triggerRef={this._triggerRef}
        menuDirection={direction}
        menuOffset={flipped ? menuOffsetFlip : menuOffset}
        menuRef={this._bindMenuBody}
        flipped={this.props.flipped}
        target={this._getTarget}
        onPlace={this._handlePlace}
        selectorPrimaryFocus={this.props.selectorPrimaryFocus}>
        {React.cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );

    const iconProps: IconProps = {
      className: overflowMenuIconClasses,
      'aria-label': iconDescription,
    };

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <span className={`${prefix}--overflow-menu__wrapper`}>
          {/* @ts-expect-error: Broken button props derivation, will be fine when types are added */}
          <IconButton
            {...other}
            type="button"
            aria-haspopup
            aria-expanded={this.state.open}
            className={overflowMenuClasses}
            onClick={this.handleClick}
            id={id}
            ref={mergeRefs(this._triggerRef, ref)}
            size={size}
            label={iconDescription}>
            <IconElement {...iconProps} />
          </IconButton>
          {open && this.state.hasMountedTrigger && wrappedMenuBody}
        </span>
      </ClickListener>
    );
  }
}

const WithFwdRef = React.forwardRef<HTMLElement, OverflowMenuProps>(
  (props, ref) => {
    return <OverflowMenuComponent {...props} innerRef={ref} />;
  }
);
WithFwdRef.displayName = 'OverflowMenu';

export const OverflowMenu = WithFwdRef;
export default WithFwdRef;
