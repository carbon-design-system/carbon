import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/toggle/toggle.scss';

class Toggle extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    defaultToggled: React.PropTypes.bool,
    onToggle: React.PropTypes.func,
    id: React.PropTypes.string.isRequired,
    toggled: React.PropTypes.bool,
    labelA: React.PropTypes.string.isRequired,
    labelB: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    defaultToggled: false,
    labelA: 'Off',
    labelB: 'On',
    onToggle() { },
  }

  handleToggle = (evt) => {
    this.props.onToggle(this.input.checked, this.props.id, evt);
  };

  render() {
    const {
      className,
      defaultToggled,
      onToggle, // eslint-disable-line no-unused-vars
      toggled, // eslint-disable-line no-unused-vars
      id,
      labelA,
      labelB,
      ...other,
    } = this.props;

    const wrapperClasses = classNames(
      'toggleWrapper',
      className
    );

    const checkedProps = {};

    if (this.props.hasOwnProperty('toggled')) {
      checkedProps.checked = toggled;
    } else {
      checkedProps.defaultChecked = defaultToggled;
    }

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          {...checkedProps}
          type="checkbox"
          id={id}
          className="bx--toggle"
          onChange={this.handleToggle}
          ref={el => { this.input = el; }}
        />

        <label className="bx--toggle__label" htmlFor={id}>
          <span className="bx--toggle__text--left">{labelA}</span>
          <span className="bx--toggle__appearance"></span>
          <span className="bx--toggle__text--right">{labelB}</span>
        </label>
      </div>
    );
  }
}

export default Toggle;
