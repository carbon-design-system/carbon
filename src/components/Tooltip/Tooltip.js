import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';
import FloatingMenu from '../../internal/FloatingMenu';
import ClickListener from '../../internal/ClickListener';

export default class Tooltip extends Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
    menuOffset: PropTypes.object,
    triggerText: PropTypes.string,
    showIcon: PropTypes.bool,
    iconName: PropTypes.string,
    iconDescription: PropTypes.string,
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
      children,
      className,
      direction,
      triggerText,
      showIcon,
      iconName,
      iconDescription,
      menuOffset,
      ...other
    } = this.props;

    const tooltipClasses = classNames(
      'bx--tooltip',
      { 'bx--tooltip--shown': this.state.open },
      className
    );

    return (
      <div>
        <ClickListener onClickOutside={this.handleClickOutside}>
          {showIcon ? (
            <div className="bx--tooltip__trigger">
              {triggerText}
              <div
                ref={node => {
                  this.triggerEl = node;
                }}
                onMouseOver={() => this.handleMouse('over')}
                onMouseOut={() => this.handleMouse('out')}
                onFocus={() => this.handleMouse('over')}
                onBlur={() => this.handleMouse('out')}>
                <Icon
                  onKeyDown={this.handleKeyPress}
                  onClick={() => this.handleMouse('click')}
                  role="button"
                  tabIndex="0"
                  name={iconName}
                  description={iconDescription}
                />
              </div>
            </div>
          ) : (
            <div
              className="bx--tooltip__trigger"
              ref={node => {
                this.triggerEl = node;
              }}
              onMouseOver={() => this.handleMouse('over')}
              onMouseOut={() => this.handleMouse('out')}
              onFocus={() => this.handleMouse('over')}
              onBlur={() => this.handleMouse('out')}>
              {triggerText}
            </div>
          )}
        </ClickListener>
        <FloatingMenu
          menuPosition={this.state.triggerPosition}
          menuDirection={direction}
          menuOffset={menuOffset}>
          <div
            className={tooltipClasses}
            {...other}
            data-floating-menu-direction={direction}>
            {children}
          </div>
        </FloatingMenu>
      </div>
    );
  }
}
