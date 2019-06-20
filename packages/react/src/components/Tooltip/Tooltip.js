/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isForwardRef } from 'react-is';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import Information from '@carbon/icons-react/lib/information/16';
import { settings } from 'carbon-components';
import FloatingMenu, {
  DIRECTION_LEFT,
  DIRECTION_TOP,
  DIRECTION_RIGHT,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import ClickListener from '../../internal/ClickListener';
import mergeRefs from '../../tools/mergeRefs';
import { keys, keyCodes, matches as keyDownMatch } from '../../tools/key';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

const { prefix } = settings;

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} menuDirection Where the floating menu menu should be placed relative to the trigger button.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = (menuBody, menuDirection) => {
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const arrowPositionProp = {
    [DIRECTION_LEFT]: 'right',
    [DIRECTION_TOP]: 'bottom',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const menuPositionAdjustmentProp = {
    [DIRECTION_LEFT]: 'left',
    [DIRECTION_TOP]: 'top',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const values = [arrowPositionProp, 'border-bottom-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  values[arrowPositionProp] = values[arrowPositionProp] || -6; // IE, etc.
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const {
      [arrowPositionProp]: arrowPosition,
      'border-bottom-width': borderBottomWidth,
    } = values;
    return {
      left: 0,
      top: 0,
      [menuPositionAdjustmentProp]:
        Math.sqrt(Math.pow(borderBottomWidth, 2) * 2) - arrowPosition,
    };
  }
};

class Tooltip extends Component {
  state = {};

  static propTypes = {
    /**
     * The ID of the trigger button.
     */
    triggerId: PropTypes.string,

    /**
     * The ID of the tooltip content.
     */
    tooltipId: PropTypes.string,

    /**
     * Open/closed state.
     */
    open: PropTypes.bool,

    /**
     * Contents to put into the tooltip.
     */
    children: PropTypes.node,

    /**
     * The CSS class names of the tooltip.
     */
    className: PropTypes.string,

    /**
     * The CSS class names of the trigger UI.
     */
    triggerClassName: PropTypes.string,

    /**
     * Where to put the tooltip, relative to the trigger UI.
     */
    direction: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),

    /**
     * The adjustment of the tooltip position.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The callback function to optionally render the icon element.
     * It should be a component with React.forwardRef().
     */
    renderIcon: function(props, propName, componentName) {
      if (props[propName] == undefined) {
        return;
      }
      const RefForwardingComponent = props[propName];
      if (!isForwardRef(<RefForwardingComponent />))
        return new Error(`Invalid value of prop '${propName}' supplied to '${componentName}',
                          it should be created/wrapped with React.forwardRef() to have a ref and access the proper
                          DOM node of the element to calculate its position in the viewport.`);
    },

    /**
     * `true` to show the default tooltip icon.
     */
    showIcon: PropTypes.bool,

    /**
     * The name of the default tooltip icon.
     */
    iconName: PropTypes.string,

    ...isRequiredOneOf({
      /**
       * The content to put into the trigger UI, except the (default) tooltip icon.
       */
      triggerText: PropTypes.node,
      /**
       * The description of the default tooltip icon, to be put in its SVG 'aria-label' and 'alt' .
       */
      iconDescription: PropTypes.string,
    }),

    /**
     * Optional prop to specify the tabIndex of the Tooltip
     */
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    open: false,
    direction: DIRECTION_BOTTOM,
    renderIcon: Information,
    showIcon: true,
    triggerText: null,
    menuOffset: getMenuOffset,
  };

  /**
   * The element of the tooltip body.
   * @type {Element}
   * @private
   */
  _tooltipEl = null;

  componentDidMount() {
    if (!this._debouncedHandleHover) {
      this._debouncedHandleHover = debounce(this._handleHover, 200);
    }
    requestAnimationFrame(() => {
      this.getTriggerPosition();
    });

    document.addEventListener('keydown', this.handleEscKeyPress, false);
  }

  componentWillUnmount() {
    if (this._debouncedHandleHover) {
      this._debouncedHandleHover.cancel();
      this._debouncedHandleHover = null;
    }

    document.removeEventListener('keydown', this.handleEscKeyPress, false);
  }

  static getDerivedStateFromProps({ open }, state) {
    /**
     * so that tooltip can be controlled programmatically through this `open` prop
     */
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  getTriggerPosition = () => {
    if (this.triggerEl) {
      const triggerPosition = this.triggerEl.getBoundingClientRect();
      this.setState({ triggerPosition });
    }
  };

  /**
   * Handles `mouseover`/`mouseout`/`focus`/`blur` event.
   * @param {string} state `over` to show the tooltip, `out` to hide the tooltip.
   * @param {Element} [relatedTarget] For handing `mouseout` event, indicates where the mouse pointer is gone.
   */
  _handleHover = (state, relatedTarget) => {
    if (state === 'over') {
      this.getTriggerPosition();
      this.setState({ open: true });
    } else {
      // Note: SVGElement in IE11 does not have `.contains()`
      const shouldPreventClose =
        relatedTarget &&
        ((this.triggerEl &&
          this.triggerEl.contains &&
          this.triggerEl.contains(relatedTarget)) ||
          (this._tooltipEl && this._tooltipEl.contains(relatedTarget)));
      if (!shouldPreventClose) {
        this.setState({ open: false });
      }
    }
  };

  /**
   * The debounced version of the `mouseover`/`mouseout`/`focus`/`blur` event handler.
   * @type {Function}
   * @private
   */
  _debouncedHandleHover = null;

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () =>
    (this.triggerEl &&
      this.triggerEl.closest('[data-floating-menu-container]')) ||
    document.body;

  handleMouse = evt => {
    if (evt.type === 'click') {
      evt.stopPropagation();
      const shouldOpen = !this.state.open;
      if (shouldOpen) {
        this.getTriggerPosition();
      }
      this.setState({ open: shouldOpen });
    }
  };

  handleClickOutside = evt => {
    const shouldPreventClose =
      evt &&
      evt.target &&
      this._tooltipEl &&
      this._tooltipEl.contains(evt.target);
    if (!shouldPreventClose) {
      this.setState({ open: false });
    }
  };

  handleKeyPress = event => {
    if (keyDownMatch(event, [keys.ESC, keyCodes.ESC, keyCodes.IEESC])) {
      event.stopPropagation();
      this.setState({ open: false });
    }

    if (
      keyDownMatch(event, [
        keys.ENTER,
        keyCodes.ENTER,
        keys.SPACE,
        keyCodes.SPACE,
      ])
    ) {
      event.stopPropagation();
      this.setState({ open: !this.state.open });
    }
  };

  handleEscKeyPress = event => {
    const { open } = this.state;
    if (open && keyDownMatch(event, [keys.ESC, keyCodes.ESC, keyCodes.IEESC])) {
      return this.setState({ open: false });
    }
  };

  render() {
    const {
      triggerId = (this.triggerId =
        this.triggerId ||
        `__carbon-tooltip-trigger_${Math.random()
          .toString(36)
          .substr(2)}`),
      tooltipId = (this.tooltipId =
        this.tooltipId ||
        `__carbon-tooltip_${Math.random()
          .toString(36)
          .substr(2)}`),
      children,
      className,
      triggerClassName,
      direction,
      triggerText,
      showIcon,
      iconName,
      iconDescription,
      renderIcon: IconCustomElement,
      menuOffset,
      tabIndex = 0,
      innerRef: ref,
      ...other
    } = this.props;

    const { open } = this.state;

    const tooltipClasses = classNames(
      `${prefix}--tooltip`,
      { [`${prefix}--tooltip--shown`]: open },
      className
    );

    const triggerClasses = classNames(
      `${prefix}--tooltip__label`,
      triggerClassName
    );

    const refProp = mergeRefs(ref, node => {
      this.triggerEl = node;
    });

    const iconProperties = { name: iconName, role: null, description: null };

    const properties = {
      role: 'button',
      tabIndex: tabIndex,
      onClick: this.handleMouse,
      onKeyDown: this.handleKeyPress,
      onMouseOver: this.handleMouse,
      onMouseOut: this.handleMouse,
      onFocus: this.handleMouse,
      onBlur: this.handleMouse,
      'aria-haspopup': 'true',
      'aria-expanded': open,
      // if the user provides property `triggerText`,
      // then the button should use aria-describedby to point to its id,
      // if the user doesn't provide property `triggerText`,
      // then an aria-label will be provided via the `iconDescription` property.
      ...(triggerText
        ? {
            'aria-describedby': triggerId,
          }
        : {
            'aria-label': iconDescription,
          }),
    };

    return (
      <>
        <ClickListener onClickOutside={this.handleClickOutside}>
          {showIcon ? (
            <div id={triggerId} className={triggerClasses}>
              {triggerText}
              <div className={`${prefix}--tooltip__trigger`} {...properties}>
                <IconCustomElement ref={refProp} {...iconProperties} />
              </div>
            </div>
          ) : (
            <div
              id={triggerId}
              className={triggerClasses}
              ref={refProp}
              {...properties}>
              {triggerText}
            </div>
          )}
        </ClickListener>
        {open && (
          <FloatingMenu
            target={this._getTarget}
            menuPosition={this.state.triggerPosition}
            menuDirection={direction}
            menuOffset={menuOffset}
            menuRef={node => {
              this._tooltipEl = node;
            }}>
            <div
              id={tooltipId}
              className={tooltipClasses}
              {...other}
              data-floating-menu-direction={direction}
              onMouseOver={this.handleMouse}
              onMouseOut={this.handleMouse}
              onFocus={this.handleMouse}
              onBlur={this.handleMouse}
              onContextMenu={this.handleMouse}
              role="tooltip">
              <span className={`${prefix}--tooltip__caret`} />
              {children}
            </div>
          </FloatingMenu>
        )}
      </>
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => <Tooltip {...props} innerRef={ref} />;
  forwardRef.displayName = 'Tooltip';
  return React.forwardRef(forwardRef);
})();
