import PropTypes from 'prop-types';
import React from 'react';

export default class InlineCheckbox extends React.Component {
  static propTypes = {
    /**
     * Specify the label for the control
     */
    ariaLabel: PropTypes.string.isRequired,

    /**
     * Specify whether the underlying control is checked, or not
     */
    checked: PropTypes.bool.isRequired,

    /**
     * Provide an `id` for the underlying input control
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether the control is in an indterminate state
     */
    indeterminate: PropTypes.bool,

    /**
     * Provide a `name` for the underlying input control
     */
    name: PropTypes.string.isRequired,

    /**
     * Provide a handler that is invoked when a user clicks on the control
     */
    onClick: PropTypes.func,

    /**
     * Provide a handler that is invoked on the key down event for the control
     */
    onKeyDown: PropTypes.func,
  };

  componentDidMount() {
    this.inputNode.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.inputNode.indeterminate = this.props.indeterminate;
    }
  }

  handleRef = el => {
    this.inputNode = el;
  };

  render() {
    const {
      id,
      indeterminate,
      checked,
      ariaLabel,
      name,
      onClick,
      onKeyDown,
    } = this.props;
    const inputProps = {
      id,
      name,
      onClick,
      onKeyDown,
      className: 'bx--checkbox',
      type: 'checkbox',
      ref: this.handleRef,
      checked: false,
    };

    if (checked) {
      inputProps.checked = true;
    }

    if (indeterminate) {
      inputProps.checked = false;
      inputProps['aria-checked'] = 'mixed';
    }

    return (
      <React.Fragment>
        <input {...inputProps} />
        <label
          htmlFor={id}
          className="bx--checkbox-label"
          aria-label={ariaLabel}
        />
      </React.Fragment>
    );
  }
}
