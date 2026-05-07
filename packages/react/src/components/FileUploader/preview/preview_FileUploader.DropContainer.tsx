/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FileUploaderDropContainer, {
  type FileUploaderDropContainerProps,
} from '../FileUploaderDropContainer';
import { useFileUploaderContext } from './preview_FileUploader';

export interface FileUploaderDropContainerComposableProps
  extends Omit<FileUploaderDropContainerProps, 'disabled'> {
  /**
   * Override the disabled state from context
   */
  disabled?: boolean;
}

/**
 * FileUploader.DropContainer component for adding files via drag and drop.
 * Inherits disabled state from FileUploader context unless overridden.
 *
 * @example
 * ```jsx
 * <FileUploader.DropContainer
 *   labelText="Drag and drop files here or click to upload"
 *   onAddFiles={(evt, { addedFiles }) => {
 *     setFiles(prev => [...prev, ...addedFiles]);
 *   }}
 * />
 * ```
 */
function FileUploaderDropContainerComposable({
  disabled: disabledProp,
  ...other
}: FileUploaderDropContainerComposableProps) {
  const context = useFileUploaderContext();

  // Use prop value if provided, otherwise fall back to context
  const disabled = disabledProp ?? context.disabled;

  return <FileUploaderDropContainer disabled={disabled} {...other} />;
}

FileUploaderDropContainerComposable.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

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
  labelText: PropTypes.string,

  /**
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize: PropTypes.number,

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
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a custom regex pattern for the acceptedTypes
   */
  pattern: PropTypes.string,
};

export default FileUploaderDropContainerComposable;
