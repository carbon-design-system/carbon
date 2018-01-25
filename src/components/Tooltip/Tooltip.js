import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';
import FloatingMenu from '../../internal/FloatingMenu';
import ClickListener from '../../internal/ClickListener';

export default class Tooltip extends Component {
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
    menuOffset: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),

    /**
     * The content to put into the trigger UI, except the (default) tooltip icon.
     */
    triggerText: PropTypes.node,

    /**
     * `true` to show the default tooltip icon.
     */
    showIcon: PropTypes.bool,

    /**
     * The name of the default tooltip icon.
     */
    iconName: PropTypes.string,

    /**
     * The description of the default tooltip icon, to be put in its SVG `<title>` element.
     */
    iconDescription: PropTypes.string,

    /**
     * `true` if opening tooltip should be triggered by clicking the trigger button.
     */
    clickToOpen: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    direction: 'bottom',
    showIcon: true,
    iconName: 'info--glyph',
    iconDescription: 'tooltip',
    triggerText: 'Provide triggerText',
    menuOffset: {},
  };

  state = {
    open: this.props.open,
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getTriggerPosition();
    });
  }

  getTriggerPosition = () => {
    if (this.triggerEl) {
      const triggerPosition = this.triggerEl.getBoundingClientRect();
      this.setState({ triggerPosition });
    }
  };

  handleMouse = state => {
    if (this.props.clickToOpen) {
      if (state === 'click') {
        this.setState({ open: !this.state.open });
      }
    } else {
      if (state === 'over') {
        this.getTriggerPosition();
        this.setState({ open: true });
      } else {
        this.setState({ open: false });
      }
    }
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  handleKeyPress = evt => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.setState({ open: !this.state.open });
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
      menuOffset,
      // Exclude `clickToOpen` from `other` to avoid passing it along to `<div>`
      // eslint-disable-next-line no-unused-vars
      clickToOpen,
      ...other
    } = this.props;

    const { open } = this.state;

    const tooltipClasses = classNames(
      'bx--tooltip',
      { 'bx--tooltip--shown': open },
      className
    );

    const triggerClasses = classNames('bx--tooltip__trigger', triggerClassName);

    return (
      <div>
        <ClickListener onClickOutside={this.handleClickOutside}>
          {showIcon ? (
            <div className={triggerClasses}>
              {triggerText}
              <div
                id={triggerId}
                role="button"
                tabIndex="0"
                ref={node => {
                  this.triggerEl = node;
                }}
                onMouseOver={() => this.handleMouse('over')}
                onMouseOut={() => this.handleMouse('out')}
                onFocus={() => this.handleMouse('over')}
                onBlur={() => this.handleMouse('out')}
                aria-haspopup="true"
                aria-owns={tooltipId}
                aria-expanded={open}>
                <Icon
                  onKeyDown={this.handleKeyPress}
                  onClick={() => this.handleMouse('click')}
                  name={iconName}
                  description={iconDescription}
                />
              </div>
            </div>
          ) : (
            <div
              id={triggerId}
              className={triggerClasses}
              ref={node => {
                this.triggerEl = node;
              }}
              onMouseOver={() => this.handleMouse('over')}
              onMouseOut={() => this.handleMouse('out')}
              onFocus={() => this.handleMouse('over')}
              onBlur={() => this.handleMouse('out')}
              aria-haspopup="true"
              aria-owns={tooltipId}
              aria-expanded={open}>
              {triggerText}
            </div>
          )}
        </ClickListener>
        <FloatingMenu
          menuPosition={this.state.triggerPosition}
          menuDirection={direction}
          menuOffset={menuOffset}>
          <div
            id={tooltipId}
            className={tooltipClasses}
            {...other}
            data-floating-menu-direction={direction}
            aria-labelledby={triggerId}>
            {children}
          </div>
        </FloatingMenu>
      </div>
    );
  }
}
