/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { cloneElement, type ReactNode } from 'react';
import cx from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface CheckboxGroupProps {
  children?: ReactNode;
  className?: string;
  decorator?: ReactNode;
  helperText?: ReactNode;
  invalid?: boolean;
  invalidText?: ReactNode;
  legendId?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  legendText: ReactNode;
  readOnly?: boolean;
  /**
   * * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug?: ReactNode;
  warn?: boolean;
  warnText?: ReactNode;
}

export interface CustomType {
  size: string;
  kind: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  className,
  decorator,
  helperText,
  invalid,
  invalidText,
  legendId,
  legendText,
  readOnly,
  warn,
  warnText,
  slug,
  orientation = 'vertical',
  ...rest
}) => {
  const prefix = usePrefix();

  const showWarning = !readOnly && !invalid && warn;
  const showHelper = !invalid && !warn;

  const checkboxGroupInstanceId = useId();

  const helperId = !helperText
    ? undefined
    : `checkbox-group-helper-text-${checkboxGroupInstanceId}`;

  const helper = helperText ? (
    <div id={helperId} className={`${prefix}--form__helper-text`}>
      {helperText}
    </div>
  ) : null;

  const fieldsetClasses = cx(`${prefix}--checkbox-group`, className, {
    [`${prefix}--checkbox-group--${orientation}`]: orientation === 'horizontal',
    [`${prefix}--checkbox-group--readonly`]: readOnly,
    [`${prefix}--checkbox-group--invalid`]: !readOnly && invalid,
    [`${prefix}--checkbox-group--warning`]: showWarning,
    [`${prefix}--checkbox-group--slug`]: slug,
    [`${prefix}--checkbox-group--decorator`]: decorator,
  });

  // AILabel always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini', kind: 'default' })
    : null;

  return (
    <fieldset
      className={fieldsetClasses}
      data-invalid={invalid ? true : undefined}
      aria-labelledby={rest['aria-labelledby'] || legendId}
      aria-readonly={readOnly}
      aria-describedby={!invalid && !warn && helper ? helperId : undefined}
      {...rest}>
      <legend
        className={`${prefix}--label`}
        id={legendId || rest['aria-labelledby']}>
        {legendText}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--checkbox-group-inner--decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </legend>
      {children}
      <div className={`${prefix}--checkbox-group__validation-msg`}>
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
      </div>
      {showHelper && helper}
    </fieldset>
  );
};

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
   * **Experimental**: Provide a decorator component to be rendered inside the `CheckboxGroup` component
   */
  decorator: PropTypes.node,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the form group is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the form group is in an invalid state
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
   * Provide the orientation for how the checkbox should be displayed
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Whether the CheckboxGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `CheckboxGroup` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify whether the form group is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the form group is in warning state
   */
  warnText: PropTypes.node,
};

export default CheckboxGroup;
