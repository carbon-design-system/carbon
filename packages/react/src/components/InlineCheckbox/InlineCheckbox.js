/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import mergeRefs from '../../tools/mergeRefs';

const { prefix } = settings;

class InlineCheckbox extends React.Component {
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
     * Specify whether the underlying input control should be disabled
     */
    disabled: PropTypes.bool,

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
     * Provide an optional hook that is called each time the input is updated
     */
    onChange: PropTypes.func,

    /**
     * Provide a handler that is invoked when a user clicks on the control
     */
    onClick: PropTypes.func,
    /**
     * Provide a handler that is invoked on the key down event for the control
     */
    onKeyDown: PropTypes.func,

    /**
     * Provide an optional tooltip for the InlineCheckbox
     */
    title: PropTypes.string,
  };

  static defaultProps = {
    ariaLabel: '',
    checked: false,
    id: 'inline-checkbox',
    name: '',
    onChange: () => {},
  };

  componentDidMount() {
    if (this.inputNode) {
      this.inputNode.indeterminate = this.props.indeterminate;
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.inputNode &&
      prevProps.indeterminate !== this.props.indeterminate
    ) {
      this.inputNode.indeterminate = this.props.indeterminate;
    }
  }

  handleRef = (el) => {
    this.inputNode = el;
  };

  render() {
    const {
      id,
      indeterminate,
      checked,
      disabled,
      ariaLabel,
      name,
      onChange,
      onClick,
      onKeyDown,
      title = undefined,
      // eslint-disable-next-line react/prop-types
      innerRef: ref,
    } = this.props;
    const inputProps = {
      id,
      name,
      onClick,
      onChange: (evt) => {
        onChange(evt.target.checked, id, evt);
      },
      onKeyDown,
      className: `${prefix}--checkbox`,
      type: 'checkbox',
      ref: mergeRefs(ref, this.handleRef),
      checked: false,
      disabled,
    };

    if (checked) {
      inputProps.checked = true;
    }

    if (indeterminate) {
      inputProps.checked = false;
      inputProps['aria-checked'] = 'mixed';
    }

    return (
      <>
        <input {...inputProps} />
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
          <label
            htmlFor={id}
            className={`${prefix}--checkbox-label`}
            aria-label={ariaLabel}
            title={title}
          />
        }
      </>
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => (
    <InlineCheckbox {...props} innerRef={ref} />
  );
  forwardRef.displayName = 'InlineCheckbox';
  return React.forwardRef(forwardRef);
})();
