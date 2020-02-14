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
import { Information16 as Information } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import FloatingMenu, {
  DIRECTION_LEFT,
  DIRECTION_TOP,
  DIRECTION_RIGHT,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import ClickListener from '../../internal/ClickListener';
import mergeRefs from '../../tools/mergeRefs';
import { keys, matches as keyDownMatch } from '../../internal/keyboard';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';
import requiredIfValueExists from '../../prop-types/requiredIfValueExists';
import { useControlledStateWithValue } from '../../internal/FeatureFlags';

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
  constructor(props) {
    super(props);
    this.isControlled = props.open !== undefined;
    if (useControlledStateWithValue && this.isControlled) {
      // Skips the logic of setting initial state if this component is controlled
      return;
    }
    const open = useControlledStateWithValue ? props.defaultOpen : props.open;
    this.state = { open };
  }

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
     * The ID of the tooltip body content.
     */
    tooltipBodyId: PropTypes.string,

    /**
     * Optional starting value for uncontrolled state
     */
    defaultOpen: PropTypes.bool,

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

    /**
     * * the signature of the event handler will be:
     * * `onChange(event, { open })` where:
     *   * `event` is the (React) raw event
     *   * `open` is the new value
     */
    onChange: !useControlledStateWithValue
      ? PropTypes.func
      : requiredIfValueExists(PropTypes.func),
  };

  static defaultProps = {
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
    if (!this._debouncedHandleFocus) {
      this._debouncedHandleFocus = debounce(this._handleFocus, 200);
    }
    requestAnimationFrame(() => {
      this.getTriggerPosition();
    });

    document.addEventListener('keydown', this.handleEscKeyPress, false);
  }

  componentWillUnmount() {
    if (this._debouncedHandleFocus) {
      this._debouncedHandleFocus.cancel();
      this._debouncedHandleFocus = null;
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

  _handleUserInputOpenClose = (event, { open }) => {
    this.setState({ open }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, { open });
      }
    });
  };

  getTriggerPosition = () => {
    if (this.triggerEl) {
      const triggerPosition = this.triggerEl.getBoundingClientRect();
      this.setState({ triggerPosition });
    }
  };

  /**
   * Handles `focus`/`blur` event.
   * @param {string} state `over` to show the tooltip, `out` to hide the tooltip.
   * @param {Element} [evt] For handing `mouseout` event, indicates where the mouse pointer is gone.
   */
  _handleFocus = (state, evt) => {
    const { relatedTarget } = evt;
    if (state === 'over') {
      this.getTriggerPosition();
      this._handleUserInputOpenClose(evt, { open: true });
    } else {
      // Note: SVGElement in IE11 does not have `.contains()`
      const shouldPreventClose =
        relatedTarget &&
        ((this.triggerEl &&
          this.triggerEl.contains &&
          this.triggerEl.contains(relatedTarget)) ||
          (this._tooltipEl && this._tooltipEl.contains(relatedTarget)));
      if (!shouldPreventClose) {
        this._handleUserInputOpenClose(evt, { open: false });
      }
    }
  };

  /**
   * The debounced version of the `focus`/`blur` event handler.
   * @type {Function}
   * @private
   */
  _debouncedHandleFocus = null;

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () =>
    (this.triggerEl &&
      this.triggerEl.closest('[data-floating-menu-container]')) ||
    document.body;

  handleMouse = evt => {
    evt.persist();
    const state = {
      focus: 'over',
      blur: 'out',
      click: 'click',
    }[evt.type];
    const hadContextMenu = this._hasContextMenu;
    this._hasContextMenu = evt.type === 'contextmenu';
    if (state === 'click') {
      evt.stopPropagation();
      evt.preventDefault();
      const shouldOpen = this.isControlled
        ? !this.props.open
        : !this.state.open;
      if (shouldOpen) {
        this.getTriggerPosition();
      }
      this._handleUserInputOpenClose(evt, { open: shouldOpen });
    } else if (
      state &&
      (state !== 'out' || !hadContextMenu) &&
      this._debouncedHandleFocus
    ) {
      this._debouncedHandleFocus(state, evt);
    }
  };

  handleClickOutside = evt => {
    const shouldPreventClose =
      evt &&
      evt.target &&
      this._tooltipEl &&
      this._tooltipEl.contains(evt.target);
    if (!shouldPreventClose) {
      this._handleUserInputOpenClose(evt, { open: false });
    }
  };

  handleKeyPress = event => {
    if (keyDownMatch(event, [keys.Escape])) {
      event.stopPropagation();
      this._handleUserInputOpenClose(event, { open: false });
    }

    if (keyDownMatch(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();
      const shouldOpen = this.isControlled
        ? !this.props.open
        : !this.state.open;
      if (shouldOpen) {
        this.getTriggerPosition();
      }
      this._handleUserInputOpenClose(event, { open: shouldOpen });
    }
  };

  handleEscKeyPress = event => {
    const { open } = this.isControlled ? this.props : this.state;
    if (open && keyDownMatch(event, [keys.Escape])) {
      return this._handleUserInputOpenClose(event, { open: false });
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
      tooltipBodyId,
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

    const { open } = this.isControlled ? this.props : this.state;

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
      'aria-controls': !open ? undefined : tooltipId,
      'aria-expanded': open,
      'aria-describedby': open ? tooltipId : null,
      // if the user provides property `triggerText`,
      // then the button should use aria-labelledby to point to its id,
      // if the user doesn't provide property `triggerText`,
      // then an aria-label will be provided via the `iconDescription` property.
      ...(triggerText
        ? {
            'aria-labelledby': triggerId,
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
              <div
                className={`${prefix}--tooltip__content`}
                tabindex="-1"
                role="dialog"
                aria-describedby={tooltipBodyId}
                aria-labelledby={triggerId}>
                {children}
              </div>
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
