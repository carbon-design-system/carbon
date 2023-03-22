/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

function CheckboxGroup({
  children,
  className,
  // helper,
  // helperText,
  invalid,
  invalidText,
  legendId,
  legendText,
  readOnly,
  warn,
  warnText,
  ...rest
}) {
  const prefix = usePrefix();

  const showWarning = !readOnly && !invalid && warn;
  // const showHelper = !invalid && !disabled && !warn;

  // const classNamesFieldset = cx(`${prefix}--fieldset`, className);
  const fieldsetClasses = cx(`${prefix}--checkbox-group`, className, {
    [`${prefix}--checkbox-group--readonly`]: readOnly,
    [`${prefix}--checkbox-group--invalid`]: !readOnly && invalid,
    [`${prefix}--checkbox-group--warning`]: showWarning,
  });

  // const helperClasses = cx(`${prefix}--form__helper-text`);

  console.log(children);

  return (
    <fieldset
      className={fieldsetClasses}
      data-invalid={invalid ? true : undefined}
      aria-labelledby={rest['aria-labelledby'] || legendId}
      aria-readonly={readOnly}
      {...rest}>
      <legend
        className={`${prefix}--label`}
        id={legendId || rest['aria-labelledby']}>
        {legendText}
      </legend>
      {children}
      {/* {message ? (
        <div className={`${prefix}--form__requirements`}>{messageText}</div>
      ) : null} */}
      <div className={`${prefix}--checkbox__validation-msg`}>
        {!readOnly && invalid && (
          <>
            <WarningFilled className={`${prefix}--checkbox__invalid-icon`} />
            <div className={`${prefix}--form-requirement`}>{invalidText}</div>
          </>
        )}
        {showWarning && (
          <>
            <WarningAltFilled
              className={`${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`}
            />
            <div className={`${prefix}--form-requirement`}>{warnText}</div>
          </>
        )}
        {/* {showHelper && helper} */}
      </div>
    </fieldset>
  );
}

CheckboxGroup.propTypes = {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  legendId: PropTypes.node,

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: PropTypes.node.isRequired,

  /**
   * Specify whether the message should be displayed in the <FormGroup>
   */
  message: PropTypes.bool,

  /**
   * Provide the text for the message in the <FormGroup>
   */
  messageText: PropTypes.string,

  /**
   * Whether the CheckboxGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

// CheckboxGroup.defaultProps = {
//   invalid: false,
//   message: false,
//   messageText: '',
// };

export default CheckboxGroup;
