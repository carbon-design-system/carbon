/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactElementLike, ReactNodeLike } from 'prop-types';
import React, { createContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Legend } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import mergeRefs from '../../tools/mergeRefs';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

export const RadioButtonGroupContext = createContext(null);

type ExcludedAttributes = 'onChange';

export interface RadioButtonGroupProps
  extends Omit<
    React.InputHTMLAttributes<HTMLFieldSetElement>,
    ExcludedAttributes
  > {
  /**
   * Provide a collection of `<RadioButton>` components to render in the group
   */
  children?: ReactNodeLike;

  /**
   * Provide an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify the `<RadioButton>` to be selected by default
   */
  defaultSelected?: string | number;

  /**
   * Specify whether the group is disabled
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNodeLike;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNodeLike;

  /**
   * Provide where label text should be placed
   */
  labelPosition?: 'left' | 'right';

  /**
   * Provide a legend to the RadioButtonGroup input that you are
   * exposing to the user
   */
  legendText?: ReactNodeLike;

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: string;

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange?: (selection: unknown, name: string, evt: unknown) => void;

  /**
   * Provide where radio buttons should be placed
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether the RadioButtonGroup should be read-only
   */
  readOnly?: boolean;

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButtonGroup` component
   */
  slug?: ReactNodeLike;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNodeLike;

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected?: string | number;
}

const RadioButtonGroup = React.forwardRef(
  (props: RadioButtonGroupProps, ref) => {
    const {
      children,
      className,
      defaultSelected,
      disabled,
      helperText,
      invalid = false,
      invalidText,
      labelPosition = 'right',
      legendText,
      name,
      onChange = () => {},
      orientation = 'horizontal',
      readOnly,
      valueSelected,
      warn = false,
      warnText,
      slug,
      ...rest
    } = props;
    const prefix = usePrefix();

    const [selected, setSelected] = useState(valueSelected ?? defaultSelected);
    const [prevValueSelected, setPrevValueSelected] = useState(valueSelected);

    const { current: radioButtonGroupInstanceId } = useRef(getInstanceId());

    /**
     * prop + state alignment - getDerivedStateFromProps
     * only update if selected prop changes
     */
    if (valueSelected !== prevValueSelected) {
      setSelected(valueSelected);
      setPrevValueSelected(valueSelected);
    }

    function getRadioButtons() {
      const mappedChildren = React.Children.map(children, (radioButton) => {
        const { value } = (radioButton as ReactElementLike)?.props ?? undefined;

        const newProps = {
          name: name,
          key: value,
          value: value,
          onChange: handleOnChange,
          checked: value === selected,
        };

        if (!selected && (radioButton as ReactElementLike)?.props.checked) {
          newProps.checked = true;
        }
        if (radioButton) {
          return React.cloneElement(radioButton as ReactElementLike, newProps);
        }
      });

      return mappedChildren;
    }

    function handleOnChange(newSelection, value, evt) {
      if (!readOnly) {
        if (newSelection !== selected) {
          setSelected(newSelection);
          onChange(newSelection, name, evt);
        }
      }
    }

    const showWarning = !readOnly && !invalid && warn;
    const showHelper = !invalid && !disabled && !warn;

    const wrapperClasses = classNames(`${prefix}--form-item`, className);

    const fieldsetClasses = classNames(`${prefix}--radio-button-group`, {
      [`${prefix}--radio-button-group--${orientation}`]:
        orientation === 'vertical',
      [`${prefix}--radio-button-group--label-${labelPosition}`]: labelPosition,
      [`${prefix}--radio-button-group--readonly`]: readOnly,
      [`${prefix}--radio-button-group--invalid`]: !readOnly && invalid,
      [`${prefix}--radio-button-group--warning`]: showWarning,
      [`${prefix}--radio-button-group--slug`]: slug,
    });

    const helperClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const helperId = !helperText
      ? undefined
      : `radio-button-group-helper-text-${radioButtonGroupInstanceId}`;

    const helper = helperText ? (
      <div id={helperId} className={helperClasses}>
        {helperText}
      </div>
    ) : null;

    const divRef = useRef<HTMLDivElement>(null);

    // Slug is always size `mini`
    let normalizedSlug;
    if (slug) {
      normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
        size: 'mini',
        kind: 'default',
      });
    }

    return (
      <div className={wrapperClasses} ref={mergeRefs(divRef, ref)}>
        <fieldset
          className={fieldsetClasses}
          disabled={disabled}
          data-invalid={invalid ? true : undefined}
          aria-describedby={showHelper && helperText ? helperId : undefined}
          {...rest}>
          {legendText && (
            <Legend className={`${prefix}--label`}>
              {legendText}
              {normalizedSlug}
            </Legend>
          )}
          {getRadioButtons()}
        </fieldset>
        <div className={`${prefix}--radio-button__validation-msg`}>
          {!readOnly && invalid && (
            <>
              <WarningFilled
                className={`${prefix}--radio-button__invalid-icon`}
              />
              <div className={`${prefix}--form-requirement`}>{invalidText}</div>
            </>
          )}
          {showWarning && (
            <>
              <WarningAltFilled
                className={`${prefix}--radio-button__invalid-icon ${prefix}--radio-button__invalid-icon--warning`}
              />
              <div className={`${prefix}--form-requirement`}>{warnText}</div>
            </>
          )}
        </div>
        {showHelper && helper}
      </div>
    );
  }
);

RadioButtonGroup.propTypes = {
  /**
   * Provide a collection of `<RadioButton>` components to render in the group
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the `<RadioButton>` to be selected by default
   */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the group is disabled
   */
  disabled: PropTypes.bool,

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
   * Provide where label text should be placed
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * Provide a legend to the RadioButtonGroup input that you are
   * exposing to the user
   */
  legendText: PropTypes.node,

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange: PropTypes.func,

  /**
   * Provide where radio buttons should be placed
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * Whether the RadioButtonGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButtonGroup` component
   */
  slug: PropTypes.node,

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;
