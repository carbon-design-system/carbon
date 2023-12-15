/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useState, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useAnnouncer } from '../../internal/useAnnouncer';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';

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
   * Specify whether to display the counter
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
   * Max entity count allowed for the textarea. This is needed in order for enableCounter to display
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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextArea` component
   */
  slug?: ReactNodeLike;

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

  /**
   * Specify the method used for calculating the counter number
   */
  counterMode?: 'character' | 'word';
}

const TextArea = React.forwardRef((props: TextAreaProps, forwardRef) => {
  const {
    className,
    disabled = false,
    id,
    labelText,
    hideLabel,
    onChange = noopFn,
    onClick = noopFn,
    invalid = false,
    invalidText = '',
    helperText = '',
    light,
    placeholder = '',
    enableCounter = false,
    maxCount = undefined,
    counterMode = 'character',
    warn = false,
    warnText = '',
    rows = 4,
    slug,
    ...other
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const { defaultValue, value } = other;

  const { current: textAreaInstanceId } = useRef(getInstanceId());

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useMergedRefs([forwardRef, textareaRef]) as
    | React.LegacyRef<HTMLTextAreaElement>
    | undefined;

  function getInitialTextCount(): number {
    const targetValue =
      defaultValue || value || textareaRef.current?.value || '';
    const strValue = targetValue.toString();

    if (counterMode === 'character') {
      return strValue.length;
    } else {
      return strValue.match(/\w+/g)?.length || 0;
    }
  }

  const [textCount, setTextCount] = useState(getInitialTextCount());

  useEffect(() => {
    setTextCount(getInitialTextCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultValue, counterMode]);

  useIsomorphicEffect(() => {
    if (other.cols && textareaRef.current) {
      textareaRef.current.style.width = '';
      textareaRef.current.style.resize = 'none';
    } else if (textareaRef.current) {
      textareaRef.current.style.width = `100%`;
    }
  }, [other.cols]);

  const textareaProps: {
    id: TextAreaProps['id'];
    onKeyDown: (evt: React.KeyboardEvent) => void;
    onChange: TextAreaProps['onChange'];
    onClick: TextAreaProps['onClick'];
    maxLength?: number;
    onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
  } = {
    id,
    onKeyDown: (evt) => {
      if (!disabled && enableCounter && counterMode === 'word') {
        const key = evt.which;

        if (maxCount && textCount >= maxCount && key === 32) {
          evt.preventDefault();
        }
      }
    },
    onPaste: (evt) => {
      if (!disabled) {
        if (
          counterMode === 'word' &&
          enableCounter &&
          typeof maxCount !== 'undefined' &&
          textareaRef.current !== null
        ) {
          const existingWords: string[] =
            textareaRef.current.value.match(/\w+/g) || [];
          const pastedWords: string[] =
            evt.clipboardData.getData('Text').match(/\w+/g) || [];

          const totalWords = existingWords.length + pastedWords.length;

          if (totalWords > maxCount) {
            evt.preventDefault();

            const allowedWords = existingWords
              .concat(pastedWords)
              .slice(0, maxCount);

            setTimeout(() => {
              setTextCount(maxCount);
            }, 0);

            textareaRef.current.value = allowedWords.join(' ');
          }
        }
      }
    },
    onChange: (evt) => {
      if (!disabled) {
        if (counterMode == 'character') {
          evt?.persist?.();
          // delay textCount assignation to give the textarea element value time to catch up if is a controlled input
          setTimeout(() => {
            setTextCount(evt.target?.value?.length);
          }, 0);
        } else if (counterMode == 'word') {
          if (!evt.target.value) {
            setTimeout(() => {
              setTextCount(0);
            }, 0);

            return;
          }

          if (
            enableCounter &&
            typeof maxCount !== 'undefined' &&
            textareaRef.current !== null
          ) {
            const matchedWords = evt.target?.value?.match(/\w+/g);
            if (matchedWords && matchedWords.length <= maxCount) {
              textareaRef.current.removeAttribute('maxLength');

              setTimeout(() => {
                setTextCount(matchedWords.length);
              }, 0);
            } else if (matchedWords && matchedWords.length > maxCount) {
              setTimeout(() => {
                setTextCount(matchedWords.length);
              }, 0);
            }
          }
        }
        if (onChange) {
          onChange(evt);
        }
      }
    },
    onClick: (evt) => {
      if (!disabled && onClick) {
        onClick(evt);
      }
    },
  };

  const formItemClasses = classNames(`${prefix}--form-item`, className);

  const textAreaWrapperClasses = classNames(`${prefix}--text-area__wrapper`, {
    [`${prefix}--text-area__wrapper--readonly`]: other.readOnly,
    [`${prefix}--text-area__wrapper--warn`]: warn,
    [`${prefix}--text-area__wrapper--slug`]: slug,
  });

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel && !isFluid,
    [`${prefix}--label--disabled`]: disabled,
  });

  const textareaClasses = classNames(`${prefix}--text-area`, {
    [`${prefix}--text-area--light`]: light,
    [`${prefix}--text-area--invalid`]: invalid,
    [`${prefix}--text-area--warn`]: warn,
  });

  const counterClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const label = labelText ? (
    <Text as="label" htmlFor={id} className={labelClasses}>
      {labelText}
    </Text>
  ) : null;

  const counter =
    enableCounter &&
    maxCount &&
    (counterMode === 'character' || counterMode === 'word') ? (
      <Text
        as="div"
        className={counterClasses}>{`${textCount}/${maxCount}`}</Text>
    ) : null;

  const helperId = !helperText
    ? undefined
    : `text-area-helper-text-${textAreaInstanceId}`;

  const helper = helperText ? (
    <Text as="div" id={helperId} className={helperTextClasses}>
      {helperText}
    </Text>
  ) : null;

  const errorId = id + '-error-msg';

  const error = invalid ? (
    <Text
      as="div"
      role="alert"
      className={`${prefix}--form-requirement`}
      id={errorId}>
      {invalidText}
      {isFluid && (
        <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
      )}
    </Text>
  ) : null;

  const warning = warn ? (
    <Text as="div" role="alert" className={`${prefix}--form-requirement`}>
      {warnText}
      {isFluid && (
        <WarningAltFilled
          className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
        />
      )}
    </Text>
  ) : null;

  let ariaDescribedBy;
  if (invalid) {
    ariaDescribedBy = errorId;
  } else if (!invalid && !warn && !isFluid && helperText) {
    ariaDescribedBy = helperId;
  }

  if (enableCounter) {
    // handle different counter mode
    if (counterMode == 'character') {
      textareaProps.maxLength = maxCount;
    }
  }
  const ariaAnnouncement = useAnnouncer(
    textCount,
    maxCount,
    counterMode === 'word' ? 'words' : undefined
  );

  const input = (
    <textarea
      {...other}
      {...textareaProps}
      placeholder={placeholder}
      className={textareaClasses}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      rows={rows}
      readOnly={other.readOnly}
      ref={ref}
    />
  );

  // Slug is always size `mini`
  let normalizedSlug;
  if (slug && slug['type']?.displayName === 'Slug') {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'mini',
    });
  }

  return (
    <div className={formItemClasses}>
      <div className={`${prefix}--text-area__label-wrapper`}>
        {label}
        {counter}
      </div>
      <div className={textAreaWrapperClasses} data-invalid={invalid || null}>
        {invalid && !isFluid && (
          <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
        )}
        {warn && !invalid && !isFluid && (
          <WarningAltFilled
            className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
          />
        )}
        {input}
        {normalizedSlug}
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
   * Specify the method used for calculating the counter number
   */
  counterMode: PropTypes.oneOf(['character', 'word']),

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether to display the counter
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
   * Max entity count allowed for the textarea. This is needed in order for enableCounter to display
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
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextArea` component
   */
  slug: PropTypes.node,

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

export default TextArea;
