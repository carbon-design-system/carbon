import React from 'react';
import RadioButton from '../elements/RadioButton';
import warning from 'warning';
import '@console/bluemix-components/consumables/scss/base-elements/radio/radio.scss';

class RadioButtonGroup extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    defaultSelected: React.PropTypes.any,
    name: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    valueSelected: React.PropTypes.any,
  }

  state = {
    numberCheckedRadioButtons: 0,
    selected: '',
  };

  componentWillMount() {
    let count = 0;

    React.Children.forEach(this.props.children, (option) => {
      if (this.hasCheckAttribute(option)) count++;
    }, this);

    this.setState({
      numberCheckedRadioButtons: count,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({
        selected: nextProps.valueSelected,
      });
    }
  }

  getSelectedValue() {
    return this.state.selected;
  }

  setSelectedValue(newSelectionValue) {
    this.updateRadioButtons(newSelectionValue);
  }

  handleChange = (evt, newSelection) => {
    this.updateRadioButtons(newSelection);

    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) {
        this.props.onChange(evt, newSelection);
      }
    }
  };

  updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({ selected: newSelection });
    } else {
      warning(false, `Cannot select a different radio button while
         another radio button has the 'checked' property set to true.`);
    }
  }

  hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  }

  clearValue() {
    this.setSelectedValue('');
  }

  render() {
    const radioButtons = React.Children.map(this.props.children, (radioButton) => {
      const {
        name, // eslint-disable-line no-unused-vars
        value, // eslint-disable-line no-unused-vars
        label, // eslint-disable-line no-unused-vars
        onCheck, // eslint-disable-line no-unused-vars
        ...other,
      } = radioButton.props;


      return (
        <RadioButton
          {...other}
          ref={radioButton.props.value}
          name={this.props.name}
          key={radioButton.props.value}
          value={radioButton.props.value}
          onCheck={this.handleChange}
          checked={radioButton.props.value === this.state.selected}
        />
      );
    }, this);

    return (
      <fieldset>
        {radioButtons}
      </fieldset>
    );
  }
}

export default RadioButtonGroup;
