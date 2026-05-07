/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FileUploaderItem, {
  type FileUploaderItemProps,
} from '../FileUploaderItem';
import { useFileUploaderContext } from './preview_FileUploader';

export interface FileUploaderItemComposableProps
  extends Omit<FileUploaderItemProps, 'size'> {
  /**
   * Override the size from context
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * FileUploader.Item component for displaying an uploaded file.
 * Inherits size from FileUploader context unless overridden.
 *
 * @example
 * ```jsx
 * <FileUploader.Item
 *   uuid={file.uuid}
 *   name={file.name}
 *   status="edit"
 *   invalid={file.invalid}
 *   errorSubject="File too large"
 *   errorBody="Maximum file size is 500kb"
 *   onDelete={(evt, { uuid }) => {
 *     setFiles(prev => prev.filter(f => f.uuid !== uuid));
 *   }}
 * />
 * ```
 */
function FileUploaderItemComposable({
  size: sizeProp,
  ...other
}: FileUploaderItemComposableProps) {
  const context = useFileUploaderContext();

  // Use prop value if provided, otherwise fall back to context
  // Map context size to FileUploaderItem size (which doesn't support 'small' or 'field')
  let size = sizeProp;
  if (!size && context.size) {
    if (context.size === 'small' || context.size === 'sm') {
      size = 'sm';
    } else if (context.size === 'field' || context.size === 'md') {
      size = 'md';
    } else if (context.size === 'lg') {
      size = 'lg';
    }
  }

  return <FileUploaderItem size={size} {...other} />;
}

FileUploaderItemComposable.propTypes = {
  /**
   * Error message body for an invalid file upload
   */
  errorBody: PropTypes.string,

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject: PropTypes.string,

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete: PropTypes.func,

  /**
   * Specify the size of the FileUploaderItem
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),

  /**
   * Unique identifier for the file object
   */
  uuid: PropTypes.string,
};

export default FileUploaderItemComposable;
