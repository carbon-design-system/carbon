/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TextArea from '../TextArea';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidTextAreaProps {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<textarea>` node
   */
  className?: string;

  /**
   * Specify the `cols` attribute for the underlying `<textarea>` node
   */
  cols?: number;

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: React.ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Provide a unique identifier for the control
   */
  id?: string;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: React.ReactNode;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light?: boolean;

  /**
   * Max character count allowed for the textarea. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<textarea>`
   * is updated
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>;

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder?: string;

  /**
   * Specify the rows attribute for the `<textarea>`
   */
  rows?: number;

  /**
   * Provide the current value of the `<textarea>`
   */
  value?: string | number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   *  Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Whether or not the component is readonly
   */
  readOnly?: boolean;
}

const FluidTextArea: React.FC<FluidTextAreaProps> = ({
  className,
  ...other
}) => {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--text-area--fluid`, className);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <TextArea className={classNames} {...other} />
    </FormContext.Provider>
  );
};

FluidTextArea.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<textarea>` node
   */
  className: PropTypes.string,

  /**
   * Specify the `cols` attribute for the underlying `<textarea>` node
   */
  cols: PropTypes.number,

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether to display the character counter
   */
  enableCounter: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide a unique identifier for the control
   */
  id: PropTypes.string,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `FluidTextArea` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Max character count allowed for the textarea. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<textarea>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder: PropTypes.string,

  /**
   * Specify the rows attribute for the `<textarea>`
   */
  rows: PropTypes.number,

  /**
   * Provide the current value of the `<textarea>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Whether or not the component is readonly
   */
  readOnly: PropTypes.bool,
};

export default FluidTextArea;
