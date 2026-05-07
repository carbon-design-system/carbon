/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react';
import PropTypes from 'prop-types';
import FileUploaderButton, {
  type FileUploaderButtonProps,
} from '../FileUploaderButton';
import { useFileUploaderContext } from './preview_FileUploader';

export interface FileUploaderButtonComposableProps
  extends Omit<FileUploaderButtonProps, 'size' | 'disabled'> {
  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText?: ReactNode;

  /**
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (
    event: React.ChangeEvent<HTMLInputElement>,
    content: { addedFiles: File[] }
  ) => void;

  /**
   * Override the disabled state from context
   */
  disabled?: boolean;

  /**
   * Override the size from context
   */
  size?: 'sm' | 'small' | 'field' | 'md' | 'lg';
}

/**
 * FileUploader.Button component for adding files via a button interface.
 * Inherits disabled and size from FileUploader context unless overridden.
 *
 * @example
 * ```jsx
 * <FileUploader.Button
 *   onAddFiles={(evt, { addedFiles }) => {
 *     setFiles(prev => [...prev, ...addedFiles]);
 *   }}
 * >
 *   Add files
 * </FileUploader.Button>
 * ```
 */
function FileUploaderButtonComposable({
  disabled: disabledProp,
  size: sizeProp,
  onAddFiles,
  onChange,
  labelText = 'Add file',
  ...other
}: FileUploaderButtonComposableProps) {
  const context = useFileUploaderContext();

  // Use prop values if provided, otherwise fall back to context
  const disabled = disabledProp ?? context.disabled;
  const size = sizeProp ?? context.size;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (onAddFiles) {
      onAddFiles(event, { addedFiles: files });
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FileUploaderButton
      disabled={disabled}
      size={size}
      labelText={labelText}
      disableLabelChanges
      onChange={handleChange}
      {...other}
    />
  );
}

FileUploaderButtonComposable.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of underlying button
   */
  buttonKind: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'danger--primary',
    'danger--ghost',
    'danger--tertiary',
    'tertiary',
  ]),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

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
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles: PropTypes.func,

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Specify the size of the FileUploaderButton
   */
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
};

export default FileUploaderButtonComposable;
