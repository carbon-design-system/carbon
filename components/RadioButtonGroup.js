import React, { PropTypes } from 'react';
import RadioButton from './RadioButton';
import warning from 'warning';
import '@console/bluemix-components/consumables/scss/base-elements/radio/radio.scss';

class RadioButtonGroup extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultSelected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    valueSelected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    onChange: /* istanbul ignore next */() => {},
  }

  state = {
    selected: null,
  }

  componentWillMount() {
    this.setState({
      selected: this.props.valueSelected || this.props.defaultSelected || null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({
        selected: nextProps.valueSelected,
      });
    }
  }

  getRadioButtons = () => {
    const children = React.Children.map(this.props.children, (radioButton) => {
      const {
        value,
        ...other,
      } = radioButton.props;
      /* istanbul ignore if */
      if (radioButton.props.hasOwnProperty('checked')) {
        warning(false, `Instead of using the checked property on the RadioButton, set
            the defaultSelected property or valueSelected property on the RadioButtonGroup.`);
      }

      return (
        <RadioButton
          {...other}
          name={this.props.name}
          key={value}
          value={value}
          onChange={this.handleChange}
          checked={value === this.state.selected}
        />
      );
    });

    return children;
  }

  handleChange = (newSelection, value, evt) => {
    if (newSelection !== this.state.selected) {
      this.setState({ selected: newSelection });
      this.props.onChange(newSelection, this.props.name, evt);
    }
  }

  render() {
    const { disabled, className } = this.props;

    return (
      <div
        className={className}
        disabled={disabled}
      >
        {this.getRadioButtons()}
      </div>
    );
  }
}

export default RadioButtonGroup;
