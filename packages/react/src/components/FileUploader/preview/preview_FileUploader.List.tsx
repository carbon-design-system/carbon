/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../../internal/usePrefix';

export interface FileUploaderListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * The file items to render (FileUploader.Item components)
   */
  children?: ReactNode;
}

/**
 * FileUploader.List component for rendering a list of uploaded files.
 * This component provides the container for FileUploader.Item components.
 *
 * @example
 * ```jsx
 * <FileUploader.List>
 *   {files.map(file => (
 *     <FileUploader.Item key={file.uuid} {...file} onDelete={handleDelete} />
 *   ))}
 * </FileUploader.List>
 * ```
 */
function FileUploaderList({
  className,
  children,
  ...other
}: FileUploaderListProps) {
  const prefix = usePrefix();

  const classes = classNames(`${prefix}--file-container`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
}

FileUploaderList.propTypes = {
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The file items to render (FileUploader.Item components)
   */
  children: PropTypes.node,
};

export default FileUploaderList;
