/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState, type HTMLAttributes } from 'react';
import { matches, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';
import { ButtonKinds } from '../Button';

export interface FileUploaderButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'tabIndex'> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Specify the type of underlying button
   */
  buttonKind?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'danger--primary'
    | 'danger--ghost'
    | 'danger--tertiary'
    | 'tertiary';

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges?: boolean;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText?: React.ReactNode;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role?: string;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'field' | 'md' | 'lg';

  /**
   * @deprecated The `tabIndex` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default.
   */
  tabIndex?: number | string;

  innerRef?: React.RefObject<HTMLLabelElement | null>;
}

function FileUploaderButton({
  accept,
  buttonKind = 'primary',
  className,
  disabled = false,
  disableLabelChanges = false,
  id,
  labelText: ownerLabelText = 'Add file',
  multiple = false,
  onChange = noopFn,
  name,
  size = 'md',
  // eslint-disable-next-line react/prop-types
  innerRef,
  ...other
}: FileUploaderButtonProps) {
  const prefix = usePrefix();
  const [labelText, setLabelText] = useState(ownerLabelText);
  const [prevOwnerLabelText, setPrevOwnerLabelText] = useState(ownerLabelText);
  const { current: inputId } = useRef(id || useId());
  const inputNode = useRef<HTMLInputElement>(null);
  const classes = cx(`${prefix}--btn`, className, {
    [`${prefix}--btn--${buttonKind}`]: buttonKind,
    [`${prefix}--btn--disabled`]: disabled,
    // V11: remove field, small
    [`${prefix}--btn--md`]: size === 'field' || size === 'md',
    [`${prefix}--btn--sm`]: size === 'small' || size === 'sm',
    [`${prefix}--layout--size-${size}`]: size,
  });

  // Adjust label text state based on changes to the labelText prop
  if (ownerLabelText !== prevOwnerLabelText) {
    setLabelText(ownerLabelText);
    setPrevOwnerLabelText(ownerLabelText);
  }

  function onClick(event) {
    event.target.value = null;
    if (inputNode.current) {
      inputNode.current.value = '';
      inputNode.current.click();
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.Enter, keys.Space]) && inputNode.current) {
      inputNode.current.value = '';
      inputNode.current.click();
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const length = event.target.files?.length || 0;
    if (files && !disableLabelChanges) {
      if (length > 1) {
        setLabelText(`${length} files`);
      } else if (length === 1) {
        setLabelText(files[0].name);
      }
    }
    onChange(event);
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...other}
        tabIndex={
          other.tabIndex !== undefined
            ? parseInt(other.tabIndex as string)
            : undefined
        }>
        {labelText}
      </button>
      <label
        className={`${prefix}--visually-hidden`}
        ref={innerRef}
        htmlFor={inputId}>
        <span>{labelText}</span>
      </label>
      <input
        className={`${prefix}--visually-hidden`}
        ref={inputNode}
        id={inputId}
        disabled={disabled}
        type="file"
        tabIndex={-1}
        multiple={multiple}
        accept={accept?.toString()}
        name={name}
        onChange={handleOnChange}
      />
    </>
  );
}

FileUploaderButton.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of underlying button
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges: PropTypes.bool,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.node,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role: PropTypes.string,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Provide a custom tabIndex value for the `<FileUploaderButton>`
   */
  tabIndex: deprecate(
    PropTypes.number,
    'The `tabIndex` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default.'
  ),
};

export default FileUploaderButton;
