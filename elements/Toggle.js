import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/toggle/toggle.scss';


export default class Toggle extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string,
    id: React.PropTypes.string
  }

  static defaultProps = {
    className: 'bx--toggle',
    tabIndex: 0
  }

  render() {

    const toggleClasses = classNames({
      'bx--toggle': true,
      [this.props.className]: this.props.className
    });

    const toggle = <div className="toggleWrapper">
                        <input
                        className={toggleClasses}
                        disabled={this.props.disabled || false}
                        tabIndex={this.props.tabIndex}
                        type={this.props.type || 'checkbox'} id='toggle1' />
                        <label
                        className="bx--toggle__label"
                        htmlFor='toggle1'>
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
