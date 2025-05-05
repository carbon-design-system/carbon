/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';
import deprecate from '../../prop-types/deprecate';
import { textInputProps } from './util';
import { FormContext } from '../FluidForm';
import { usePrefix } from '../../internal/usePrefix';
import { useAnnouncer } from '../../internal/useAnnouncer';
import { Text } from '../Text';

type ExcludedAttributes = 'defaultValue' | 'id' | 'size' | 'value';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextInput` component
   */
  decorator?: ReactNode;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * `true` to use the inline version.
   */
  inline?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: ReactNode;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   * 'The `light` prop for `TextInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
   */
  light?: boolean;

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug?: ReactNode;

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number | undefined;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const TextInput = React.forwardRef(function TextInput(
  {
    className,
    decorator,
    disabled = false,
    helperText,
    hideLabel,
    id,
    inline = false,
    invalid = false,
    invalidText,
    labelText,
    light,
    onChange = () => {},
    onClick = () => {},
    placeholder,
    readOnly,
    size,
    type = 'text',
    warn = false,
    warnText,
    enableCounter = false,
    maxCount,
    slug,
    ...rest
  }: TextInputProps,
  ref
) {
  const prefix = usePrefix();

  const { defaultValue, value } = rest;
  const [textCount, setTextCount] = useState(
    defaultValue?.toString().length || value?.toString().length || 0
  );

  const normalizedProps = useNormalizedInputProps({
    id,
    readOnly,
    disabled,
    invalid,
    invalidText,
    warn,
    warnText,
  });

  const textInputClasses = classNames(`${prefix}--text-input`, {
    [`${prefix}--text-input--light`]: light,
    [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
    [`${prefix}--text-input--warning`]: normalizedProps.warn,
    [`${prefix}--text-input--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
  });
  const sharedTextInputProps = {
    id,
    onChange: (evt) => {
      if (!normalizedProps.disabled) {
        setTextCount(evt.target.value?.length);
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!normalizedProps.disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type,
    ref,
    className: textInputClasses,
    title: placeholder,
    disabled: normalizedProps.disabled,
    readOnly,
    ['aria-describedby']: helperText && normalizedProps.helperId,
    ...rest,
  };

  if (enableCounter) {
    sharedTextInputProps.maxLength = maxCount;
  }

  const inputWrapperClasses = classNames(
    [classNames(`${prefix}--form-item`, className)],
    `${prefix}--text-input-wrapper`,
    {
      [`${prefix}--text-input-wrapper--readonly`]: readOnly,
      [`${prefix}--text-input-wrapper--light`]: light,
      [`${prefix}--text-input-wrapper--inline`]: inline,
      [`${prefix}--text-input-wrapper--inline--invalid`]:
        inline && normalizedProps.invalid,
    }
  );
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: normalizedProps.disabled,
    [`${prefix}--label--inline`]: inline,
    [`${prefix}--label--inline--${size}`]: inline && !!size,
  });
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    [`${prefix}--form__helper-text--inline`]: inline,
  });
  const fieldOuterWrapperClasses = classNames(
    `${prefix}--text-input__field-outer-wrapper`,
    {
      [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
    }
  );
  const fieldWrapperClasses = classNames(
    `${prefix}--text-input__field-wrapper`,
    {
      [`${prefix}--text-input__field-wrapper--warning`]: normalizedProps.warn,
      [`${prefix}--text-input__field-wrapper--slug`]: slug,
      [`${prefix}--text-input__field-wrapper--decorator`]: decorator,
    }
  );
  const iconClasses = classNames({
    [`${prefix}--text-input__invalid-icon`]:
      normalizedProps.invalid || normalizedProps.warn,
    [`${prefix}--text-input__invalid-icon--warning`]: normalizedProps.warn,
  });

  const counterClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--text-input__label-counter`]: true,
  });

  const counter =
    enableCounter && maxCount ? (
      <Text
        as="div"
        className={counterClasses}>{`${textCount}/${maxCount}`}</Text>
    ) : null;

  const label = labelText ? (
    <Text as="label" htmlFor={id} className={labelClasses}>
      {labelText}
    </Text>
  ) : null;

  const labelWrapper = (
    <div className={`${prefix}--text-input__label-wrapper`}>
      {label}
      {counter}
    </div>
  );

  const helper = helperText ? (
    <Text as="div" id={normalizedProps.helperId} className={helperTextClasses}>
      {helperText}
    </Text>
  ) : null;

  const input = (
    <input
      {...textInputProps({
        sharedTextInputProps,
        invalid: normalizedProps.invalid,
        invalidId: normalizedProps.invalidId,
        warn: normalizedProps.warn,
        warnId: normalizedProps.warnId,
      })}
    />
  );

  const { isFluid } = useContext(FormContext);
  const announcerRef = useRef<HTMLSpanElement>(null);
  const [prevAnnouncement, setPrevAnnouncement] = useState('');
  const ariaAnnouncement = useAnnouncer(textCount, maxCount);
  useEffect(() => {
    if (ariaAnnouncement && ariaAnnouncement !== prevAnnouncement) {
      const announcer = announcerRef.current as HTMLSpanElement | null;
      if (announcer) {
        // Clear the content first
        announcer.textContent = '';
        // Set the new content after a small delay
        const timeoutId = setTimeout(() => {
          if (announcer) {
            announcer.textContent = ariaAnnouncement;
            setPrevAnnouncement(ariaAnnouncement);
          }
        }, 1000);
        // clear the timeout
        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }
    }
  }, [ariaAnnouncement, prevAnnouncement]);
  const Icon = normalizedProps.icon as any;

  // AILabel is always size `mini`
  let normalizedDecorator = React.isValidElement(slug ?? decorator)
    ? (slug ?? decorator)
    : null;
  if (
    normalizedDecorator &&
    normalizedDecorator['type']?.displayName === 'AILabel'
  ) {
    normalizedDecorator = React.cloneElement(
      normalizedDecorator as React.ReactElement<any>,
      {
        size: 'mini',
      }
    );
  }

  return (
    <div className={inputWrapperClasses}>
      {!inline ? (
        labelWrapper
      ) : (
        <div className={`${prefix}--text-input__label-helper-wrapper`}>
          {labelWrapper}
          {!isFluid && (normalizedProps.validation || helper)}
        </div>
      )}
      <div className={fieldOuterWrapperClasses}>
        <div
          className={fieldWrapperClasses}
          data-invalid={normalizedProps.invalid || null}>
          {Icon && <Icon className={iconClasses} />}
          {input}
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div
              className={`${prefix}--text-input__field-inner-wrapper--decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          <span
            className={`${prefix}--text-input__counter-alert`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={announcerRef}>
            {ariaAnnouncement}
          </span>
          {isFluid && <hr className={`${prefix}--text-input__divider`} />}
          {isFluid && !inline && normalizedProps.validation}
        </div>
        {!isFluid && !inline && (normalizedProps.validation || helper)}
      </div>
    </div>
  );
});

TextInput.displayName = 'TextInput';
TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextInput` component
   */
  decorator: PropTypes.node,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
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
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

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
    'The `light` prop for `TextInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Whether the input should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `TextInput` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
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

export default TextInput;
