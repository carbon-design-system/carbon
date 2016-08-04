import React from 'react';

class InternalSwitch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    defaultChecked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    inputType: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onParentShouldUpdate: React.PropTypes.func,
    onSwitch: React.PropTypes.func,
    switched: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
  };

  componentDidMount() {
    const inputNode = this.refs.checkbox;
    if ((!this.props.switched || inputNode.checked !== this.props.switched) &&
      this.props.onParentShouldUpdate) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasCheckedProp = nextProps.hasOwnProperty('checked');
    const hasToggledProp = nextProps.hasOwnProperty('toggled');
    const hasNewDefaultProp =
      (nextProps.hasOwnProperty('defaultChecked') &&
      (nextProps.defaultChecked !== this.props.defaultChecked));

    if (hasCheckedProp || hasToggledProp || hasNewDefaultProp) {
      const switched = nextProps.checked || nextProps.toggled || nextProps.defaultChecked || false;
      this.setState({
        switched,
      });

      if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
        this.props.onParentShouldUpdate(switched);
      }
    }
  }

  setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      if (this.props.onParentShouldUpdate) {
        this.props.onParentShouldUpdate(newSwitchedValue);
      }
    }
  }

  getValue() {
    return this.refs.checkbox.value;
  }

  isSwitched() {
    return this.refs.checkbox.checked;
  }

  handleChange = (evt) => {
    const isInputChecked = this.refs.checkbox.checked;

    if (!this.props.hasOwnProperty('checked') && this.props.onParentShouldUpdate) {
      this.props.onParentShouldUpdate(isInputChecked);
    }

    if (this.props.onSwitch) {
      this.props.onSwitch(evt, isInputChecked);
    }
  };

  render() {
    const {
      name,
      value,
      inputType,
      onSwitch, // eslint-disable-line no-unused-vars
      disabled,
      className,
      onParentShouldUpdate,
      switched, // eslint-disable-line no-unused-vars
      id,
      ...other,
    } = this.props;


    return (
      <input
        {...other}
        ref="checkbox"
        type={inputType}
        name={name}
        value={value}
        disabled={disabled}
        onChange={this.handleChange}
        className={className}
        id={id}
      />
    );
  }
}

export default InternalSwitch;
