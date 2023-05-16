/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useAnnouncer } from '../../internal/useAnnouncer';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
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
  helperText?: ReactNodeLike;

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
  invalidText?: ReactNodeLike;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: ReactNodeLike;

  /**
   * @deprecated
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
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick?: (evt: React.MouseEvent<HTMLTextAreaElement>) => void;

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder?: string;

  /**
   * Whether the textarea should be read-only
   */
  readOnly?: boolean;

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
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNodeLike;
}

const TextArea = React.forwardRef((props: TextAreaProps, forwardRef) => {
  const {
    className,
    id,
    labelText,
    hideLabel,
    onChange,
    onClick,
    invalid,
    invalidText,
    helperText,
    light,
    placeholder,
    enableCounter,
    maxCount,
    warn = false,
    warnText,
    ...other
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const { defaultValue, value, disabled } = other;
  const [textCount, setTextCount] = useState(
    defaultValue?.toString().length || value?.toString().length || 0
  );
  const { current: textAreaInstanceId } = useRef(getInstanceId());

  const textareaProps: {
    id: TextAreaProps['id'];
    onChange: TextAreaProps['onChange'];
    onClick: TextAreaProps['onClick'];
    maxLength?: number;
  } = {
    id,
    onChange: (evt) => {
      if (!other.disabled && onChange) {
        setTextCount(evt.target.value?.length);
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!other.disabled && onClick) {
        onClick(evt);
      }
    },
  };

  if (enableCounter) {
    textareaProps.maxLength = maxCount;
  }
  const ariaAnnouncement = useAnnouncer(textCount, maxCount);

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel && !isFluid,
    [`${prefix}--label--disabled`]: disabled,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const counterClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const counter =
    enableCounter && maxCount ? (
      <div className={counterClasses}>{`${textCount}/${maxCount}`}</div>
    ) : null;

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });

  const helperId = !helperText
    ? undefined
    : `text-area-helper-text-${textAreaInstanceId}`;

  const helper = helperText ? (
    <div id={helperId} className={helperTextClasses}>
      {helperText}
    </div>
  ) : null;

  const errorId = id + '-error-msg';

  const error = invalid ? (
    <div role="alert" className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
      {isFluid && (
        <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
      )}
    </div>
  ) : null;

  const warning = warn ? (
    <div role="alert" className={`${prefix}--form-requirement`}>
      {warnText}
      {isFluid && (
        <WarningAltFilled
          className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
        />
      )}
    </div>
  ) : null;

  const textareaClasses = classNames(`${prefix}--text-area`, {
    [`${prefix}--text-area--light`]: light,
    [`${prefix}--text-area--invalid`]: invalid,
    [`${prefix}--text-area--warn`]: warn,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useMergedRefs([forwardRef, textareaRef]) as
    | React.LegacyRef<HTMLTextAreaElement>
    | undefined;

  useIsomorphicEffect(() => {
    if (other.cols && textareaRef.current) {
      textareaRef.current.style.width = '';
      textareaRef.current.style.resize = 'none';
    } else if (textareaRef.current) {
      textareaRef.current.style.width = `100%`;
    }
  }, [other.cols]);

  let ariaDescribedBy;

  if (invalid) {
    ariaDescribedBy = errorId;
  } else if (!invalid && !warn && !isFluid && helperText) {
    ariaDescribedBy = helperId;
  }

  const input = (
    <textarea
      {...other}
      {...textareaProps}
      placeholder={placeholder}
      className={textareaClasses}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
      disabled={other.disabled}
      readOnly={other.readOnly}
      ref={ref}
    />
  );

  return (
    <div className={classNames(`${prefix}--form-item`, className)}>
      <div className={`${prefix}--text-area__label-wrapper`}>
        {label}
        {counter}
      </div>
      <div
        className={classNames(`${prefix}--text-area__wrapper`, {
          [`${prefix}--text-area__wrapper--readonly`]: other.readOnly,
          [`${prefix}--text-area__wrapper--warn`]: warn,
        })}
        data-invalid={invalid || null}>
        {invalid && !isFluid && (
          <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
        )}
        {warn && !invalid && !isFluid && (
          <WarningAltFilled
            className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
          />
        )}
        {input}
        <span className={`${prefix}--text-area__counter-alert`} role="alert">
          {ariaAnnouncement}
        </span>
        {isFluid && <hr className={`${prefix}--text-area__divider`} />}
        {isFluid && invalid ? error : null}
        {isFluid && warn && !invalid ? warning : null}
      </div>
      {!invalid && !warn && !isFluid ? helper : null}
      {invalid && !isFluid ? error : null}
      {warn && !invalid && !isFluid ? warning : null}
    </div>
  );
});

TextArea.displayName = 'TextArea';
TextArea.propTypes = {
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
    'The `light` prop for `TextArea` has ' +
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
   * Whether the textarea should be read-only
   */
  readOnly: PropTypes.bool,

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
};

TextArea.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: '',
  rows: 4,
  invalid: false,
  invalidText: '',
  helperText: '',
  enableCounter: false,
  maxCount: undefined,
  warn: false,
  warnText: '',
};

export default TextArea;
