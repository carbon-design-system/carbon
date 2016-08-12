import React from 'react';
import classNames from 'classnames';
import InternalSwitch from '../internal/InternalSwitch';
import '@console/bluemix-components/consumables/scss/base-elements/toggle/toggle.scss';

class Toggle extends React.Component {
  static propTypes = {
    defaultToggled: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    id: React.PropTypes.string,
    toggled: React.PropTypes.bool,
  }

  static defaultProps = {
    defaultToggled: false,
    disabled: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      switched: (this.props.toggled || this.props.defaultToggled),
    };
  }

  setToggled(newToggledValue) {
    this.refs.internalSwitch.setSwitched(newToggledValue);
  }

  isToggled() {
    return this.refs.internalSwitch.isSwitched();
  }

  handleStateChange = (newSwitched) => {
    this.setState({
      switched: newSwitched,
    });
  };

  handleToggle = (event, isInputChecked) => {
    if (this.props.onToggle) {
      this.props.onToggle(event, isInputChecked);
    }
  };

  render() {
    const {
      defaultToggled,
      onToggle, // eslint-disable-line no-unused-vars
      toggled,
      id,
      ...other,
    } = this.props;

    const toggleClasses = classNames({
      'bx--toggle': true,
      [this.props.className]: this.props.className,
    });

    const internalSwitchProps = {
      ref: 'internalSwitch',
      inputType: 'checkbox',
      switched: this.state.switched,
      onSwitch: this.handleToggle,
      onParentShouldUpdate: this.handleStateChange,
    };

    if (this.props.hasOwnProperty('toggled')) {
      internalSwitchProps.checked = toggled;
    } else if (this.props.hasOwnProperty('defaultToggled')) {
      internalSwitchProps.defaultChecked = defaultToggled;
    }

    return (
      <div className="toggleWrapper">
        <InternalSwitch
          {...other}
          {...internalSwitchProps}
          className={toggleClasses}
          id={id}
        />
        <label className="bx--toggle__label" htmlFor={id}>
          <span className="bx--toggle__text--left">Off</span>
          <span className="bx--toggle__appearance"></span>
          <span className="bx--toggle__text--right">On</span>
        </label>
      </div>
    );
  }
}

export default Toggle;
