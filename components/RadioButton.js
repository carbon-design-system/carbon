import React, { PropTypes } from 'react';
import classNames from 'classnames';
import uid from '../lib/uniqueId';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/radio/radio.scss';

class RadioButton extends React.Component {

  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    labelText: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  static defaultProps = {
    onChange: () => { },
  };

  componentWillMount() {
    this.uid = this.props.id || uid();
  }

  handleChange = (evt) => {
    this.props.onChange(this.props.value, this.props.name, evt);
  };

  render() {
    const wrapperClasses = classNames(
      'radioButtonWrapper',
      this.props.className,
    );

    const {
      labelText,
      ...other,
    } = this.props;

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          type="radio"
          className="bx--radio"
          onChange={this.handleChange}
          id={this.uid}
        />
        <label htmlFor={this.uid} className="bx--radio__label">
          <span className="bx--radio__appearance"></span>
          {labelText}
        </label>
        <br />
      </div>

    );
  }
}

export default RadioButton;
