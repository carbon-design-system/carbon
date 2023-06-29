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
import { ReactAttr } from '../../types/common';

export interface FormGroupProps extends ReactAttr<HTMLFieldSetElement> {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: React.ReactNode;
  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className?: string;
  /**
   * Specify whether the <FormGroup> is invalid
   */
  invalid?: boolean;
  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  legendId?: string;
  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: React.ReactNode;

  /**
   * Specify whether the message should be displayed in the <FormGroup>
   */
  message?: boolean;
  /**
   * Provide the text for the message in the <FormGroup>
   */
  messageText?: string;
}

const FormGroup = ({
  legendId,
  legendText,
  invalid,
  children,
  className,
  message,
  messageText,
  ...rest
}: FormGroupProps) => {
  const prefix = usePrefix();

  const classNamesFieldset = cx(`${prefix}--fieldset`, className);

  return (
    <fieldset
      {...(invalid && { 'data-invalid': '' })}
      className={classNamesFieldset}
      {...rest}
      aria-labelledby={rest['aria-labelledby'] || legendId}>
      <legend
        className={`${prefix}--label`}
        id={legendId || rest['aria-labelledby']}>
        {legendText}
      </legend>
      {children}
      {message ? (
        <div className={`${prefix}--form__requirements`}>{messageText}</div>
      ) : null}
    </fieldset>
  );
};

FormGroup.propTypes = {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <FormGroup> is invalid
   */
  invalid: PropTypes.bool,

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
};

FormGroup.defaultProps = {
  invalid: false,
  message: false,
  messageText: '',
};

export default FormGroup;
