import React, { Component, PropTypes } from 'react';
import Icon from './Icon';
import classNames from 'classnames';
if (process.env.importSASS || process.env.importSASS === undefined) {
  require('@console/bluemix-components/consumables/scss/base-elements/number-input/number-input.scss');
}

class NumberInput extends Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconDescription: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
  }

  static defaultProps = {
    disabled: false,
    iconDescription: 'choose a number',
    label: ' ',
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
  }

  state = {
    value: this.props.min || this.props.value,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (evt) => {
    if (!this.props.disabled) {
      this.setState({
        value: evt.target.value,
      });

      this.props.onChange(evt);
    }
  }

  handleUpArrowClick = (evt) => {
    let { value } = this.state;
    const { disabled, max, step } = this.props;

    if (!disabled) {
      if ((max !== undefined && value < max) || max === undefined) {
        value += step;
        this.setState({
          value,
        });

        this.props.onClick(evt);
        this.props.onChange(evt);
      }
    }
  }

  handleDownArrowClick = (evt) => {
    let { value } = this.state;
    const { disabled, min, step } = this.props;

    if (!disabled) {
      if ((min !== undefined && value > min) || min === undefined) {
        value -= step;
        this.setState({
          value,
        });
        this.props.onClick(evt);
        this.props.onChange(evt);
      }
    }
  }

  render() {
    const {
      className,
      disabled,
      iconDescription, // eslint-disable-line
      id,
      label,
      max,
      min,
      step,
      ...other,
    } = this.props;

    const numberInputClasses = classNames(
      'bx--number',
      className,
    );

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
    };

    return (
      <div className={numberInputClasses}>
        <label htmlFor={id} className="bx--form__label">{label}</label>
        <input
          className="bx--number__input"
          type="number"
          pattern="[0-9]*"
          {...other}
          {...props}
        />
        <span onClick={this.handleUpArrowClick} className="bx--number__arrow--up">
          <Icon
            className="bx--number__icon"
            name="caret--up"
            description={this.props.iconDescription}
          />
        </span>
        <span onClick={this.handleDownArrowClick} className="bx--number__arrow--down">
          <Icon
            className="bx--number__icon"
            name="caret--down"
            description={this.props.iconDescription}
          />
        </span>
      </div>
    );
  }
}

export default NumberInput;
