/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { useFeatureFlag } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';

const FormGroup = ({
  legendId,
  legendText,
  invalid,
  children,
  className,
  message,
  messageText,
  hasMargin, // TODO - remove in v11
  ...other
}) => {
  const prefix = usePrefix();
  const enabled = useFeatureFlag('enable-v11-release');
  const classNamesLegend = classnames(`${prefix}--label`, [
    enabled ? null : className,
  ]);
  // TODO - remove `fieldset--no-margin` in v11
  const classNamesFieldset = classnames(`${prefix}--fieldset`, className, {
    [`${prefix}--fieldset--no-margin`]: !hasMargin,
  });

  return (
    <fieldset
      {...(invalid && { 'data-invalid': '' })}
      className={classNamesFieldset}
      {...other}
      aria-labelledby={other['aria-labelledby'] || legendId}>
      <legend
        className={classNamesLegend}
        id={legendId || other['aria-labelledby']}>
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
   * Specify whether or not the FormGroup should provide bottom margin
   */
  hasMargin: PropTypes.bool,

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
  hasMargin: true,
};

export default FormGroup;
