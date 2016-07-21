import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/toggle/toggle.scss';


class Toggle extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string,
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func
  }

  static defaultProps = {
    className: 'bx--toggle',
    id: 'toggle-1',
    tabIndex: 0,
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {}
  }

  handleBlur = (evt) => {
      this.props.onBlur(evt);
  }

  handleClick = (evt) => {
      if (!this.props.disabled) {
          this.props.onClick(evt);
      }
  }

  handleFocus = (evt) => {
      this.props.onFocus(evt);
  }

  handleMouseEnter = (evt) => {
      this.props.onMouseEnter(evt);
  }

  handleMouseLeave = (evt) => {
      this.props.onMouseLeave(evt);
  }

  handleMouseDown = (evt) => {
      this.props.onMouseDown(evt);
  }

  handleMouseUp = (evt) => {
      this.props.onMouseUp(evt);
  }

  render() {

    const toggleProps = {
        disabled: this.props.disabled,
        tabIndex: this.props.tabIndex,
        type: this.props.type || 'checkbox',
        id: this.props.id,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onMouseEnter: this.handleMouseEnter,
        onMouseDown: this.handleMouseDown,
        onMouseLeave: this.handleMouseLeave,
        onMouseUp: this.handleMouseUp,
    }

    const toggleClasses = classNames({
      'bx--toggle': true,
      [this.props.className]: this.props.className
    });

    const toggle = <div className="toggleWrapper">
                        <input
                        className={toggleClasses}
                        {...toggleProps} />
                        <label
                        className="bx--toggle__label"
                        htmlFor={this.props.id}>
                        <span
                        className="bx--toggle__text--left">Off</span>
                        <span
                        className="bx--toggle__appearance"></span>
                        <span
                        className="bx--toggle__text--right">On</span>
                        </label>
                    </div>
    return toggle;
  }
}

export default Toggle;
