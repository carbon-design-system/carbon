/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../../internal/usePrefix';
import { Text } from '../../Text';

/**
 * Context for sharing state between FileUploader compound components
 */
interface FileUploaderContextType {
  disabled?: boolean;
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';
}

const FileUploaderContext = createContext<FileUploaderContextType>({
  disabled: false,
  size: 'md',
});

export const useFileUploaderContext = () => useContext(FileUploaderContext);

export interface FileUploaderComposableProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Specify the description text of this FileUploader
   */
  labelDescription?: string;

  /**
   * Specify the title text of this FileUploader
   */
  labelTitle?: string;

  /**
   * Specify the size of the FileUploader components
   */
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';

  /**
   * The child components (FileUploader.Button, FileUploader.DropContainer, FileUploader.List)
   */
  children?: ReactNode;
}

/**
 * Composable FileUploader container component.
 * This component provides context and structure for file upload functionality.
 * Use with FileUploader.Button, FileUploader.DropContainer, and FileUploader.List.
 *
 * @example
 * ```jsx
 * <FileUploader labelTitle="Upload files" labelDescription="Max file size is 500kb">
 *   <FileUploader.Button onAddFiles={handleAdd}>
 *     Add files
 *   </FileUploader.Button>
 *   <FileUploader.List>
 *     {files.map(file => (
 *       <FileUploader.Item key={file.uuid} {...file} onDelete={handleDelete} />
 *     ))}
 *   </FileUploader.List>
 * </FileUploader>
 * ```
 */
function FileUploaderComposable({
  className,
  disabled = false,
  labelDescription,
  labelTitle,
  size = 'md',
  children,
  ...other
}: FileUploaderComposableProps) {
  const prefix = usePrefix();

  const classes = classNames(`${prefix}--form-item`, className);

  const getHelperLabelClasses = (baseClass: string) =>
    classNames(baseClass, {
      [`${prefix}--label-description--disabled`]: disabled,
    });

  const contextValue: FileUploaderContextType = {
    disabled,
    size,
  };

  return (
    <FileUploaderContext.Provider value={contextValue}>
      <div className={classes} {...other}>
        {labelTitle && (
          <Text
            as="h3"
            className={getHelperLabelClasses(`${prefix}--file--label`)}>
            {labelTitle}
          </Text>
        )}
        {labelDescription && (
          <Text
            as="p"
            className={getHelperLabelClasses(`${prefix}--label-description`)}>
            {labelDescription}
          </Text>
        )}
        {children}
      </div>
    </FileUploaderContext.Provider>
  );
}

FileUploaderComposable.propTypes = {
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the description text of this FileUploader
   */
  labelDescription: PropTypes.string,

  /**
   * Specify the title text of this FileUploader
   */
  labelTitle: PropTypes.string,

  /**
   * Specify the size of the FileUploader components
   */
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
};

export default FileUploaderComposable;
