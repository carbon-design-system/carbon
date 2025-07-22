/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type HTMLAttributes,
} from 'react';
import Filename from './Filename';
import FileUploaderButton from './FileUploaderButton';
import { ButtonKinds } from '../Button/Button';
import { keys, matches } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { useId } from '../../internal/useId';

interface FileItem {
  name: string;
  uuid: string;
  file?: File;
}

export interface FileChangeData {
  addedFiles: FileItem[];
  removedFiles: FileItem[];
  currentFiles: FileItem[];
  action: 'add' | 'remove' | 'clear';
}

export interface FileDeleteData {
  deletedFile: FileItem;
  remainingFiles: FileItem[];
}

export interface FileUploaderProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Specify the type of the `<FileUploaderButton>`
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
   * Provide the label text to be read by screen readers when interacting with
   * the `<FileUploaderButton>`
   */
  buttonLabel?: string;

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: 'edit' | 'complete' | 'uploading';

  /**
   * Provide a description for the complete/close icon that can be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify the description text of this `<FileUploader>`
   */
  labelDescription?: string;

  /**
   * Specify the title text of this `<FileUploader>`
   */
  labelTitle?: string;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called for all file changes.
   * Second parameter contains complete file information.
   */
  onChange?: (event: any, data?: FileChangeData) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick?: (event: any) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item
   * is removed. Second parameter contains deleted file information.
   */
  onDelete?: (event: any, data?: FileDeleteData) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';
}

export interface FileUploaderHandle {
  /**
   * Clear internal state
   */
  clearFiles: () => void;

  /**
   * Get current files
   */
  getCurrentFiles: () => FileItem[];
}

const FileUploader = React.forwardRef(
  (
    {
      accept,
      buttonKind,
      buttonLabel,
      className,
      disabled,
      filenameStatus,
      iconDescription,
      labelDescription,
      labelTitle,
      multiple,
      name,
      onChange,
      onClick,
      onDelete,
      size,
      ...other
    }: FileUploaderProps,
    ref: ForwardedRef<FileUploaderHandle>
  ) => {
    const fileUploaderInstanceId = useId('file-uploader');
    const [fileItems, setFileItems] = useState<FileItem[]>([]);
    const nodes: HTMLElement[] = [];
    const prefix = usePrefix();

    const createFileItem = (file: File): FileItem => ({
      name: file.name,
      uuid: `${fileUploaderInstanceId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
    });

    const handleChange = (evt) => {
      evt.stopPropagation();

      const newFiles = Array.from(evt.target.files as FileList);
      const newFileItems = newFiles.map(createFileItem);

      let updatedFileItems: FileItem[];

      if (multiple) {
        const existingNames = new Set(fileItems.map((item) => item.name));
        const uniqueNewItems = newFileItems.filter(
          (item) => !existingNames.has(item.name)
        );
        updatedFileItems = [...fileItems, ...uniqueNewItems];
      } else {
        updatedFileItems = newFileItems;
      }

      setFileItems(updatedFileItems);

      if (onChange) {
        const allFiles = updatedFileItems
          .map((item) => item.file)
          .filter(Boolean) as File[];

        // Create FileList object for backward compatibility
        const fileListLike = Object.assign(allFiles, {
          item: (index: number) => allFiles[index] || null,
        });

        const enhancedEvent = {
          ...evt,
          target: {
            ...evt.target,
            files: fileListLike,
          },
        };

        const changeData: FileChangeData = {
          addedFiles: newFileItems,
          removedFiles: [],
          currentFiles: updatedFileItems,
          action: 'add',
        };

        onChange(enhancedEvent, changeData);
      }
    };

    const handleClick = (evt, { index, filenameStatus }) => {
      if (filenameStatus === 'edit') {
        evt.stopPropagation();

        const deletedItem = fileItems[index];
        if (!deletedItem) return;

        const remainingItems = fileItems.filter((_, i) => i !== index);
        setFileItems(remainingItems);

        const remainingFiles = remainingItems
          .map((item) => item.file)
          .filter(Boolean) as File[];

        // Create FileList object for backward compatibility
        const fileListLike = Object.assign(remainingFiles, {
          item: (index: number) => remainingFiles[index] || null,
        });

        const enhancedEvent = {
          ...evt,
          target: {
            ...evt.target,
            files: fileListLike,
          },
          deletedFile: deletedItem,
          remainingFiles: remainingItems,
        };

        if (onDelete) {
          const deleteData: FileDeleteData = {
            deletedFile: deletedItem,
            remainingFiles: remainingItems,
          };

          onDelete(enhancedEvent, deleteData);
        }

        if (onChange) {
          const changeData: FileChangeData = {
            addedFiles: [],
            removedFiles: [deletedItem],
            currentFiles: remainingItems,
            action: 'remove',
          };

          onChange(enhancedEvent, changeData);
        }

        if (onClick) {
          onClick(evt);
        }

        uploaderButton.current?.focus?.();
      }
    };

    useImperativeHandle(ref, () => ({
      clearFiles() {
        const previousItems = [...fileItems];
        setFileItems([]);

        if (onChange && previousItems.length > 0) {
          const changeData: FileChangeData = {
            addedFiles: [],
            removedFiles: previousItems,
            currentFiles: [],
            action: 'clear',
          };

          onChange({} as any, changeData);
        }
      },
      getCurrentFiles() {
        return [...fileItems];
      },
    }));

    const uploaderButton = React.createRef<HTMLLabelElement>();
    const classes = classNames({
      [`${prefix}--form-item`]: true,
      [className as string]: className,
    });
    const getHelperLabelClasses = (baseClass) =>
      classNames(baseClass, {
        [`${prefix}--label-description--disabled`]: disabled,
      });

    const selectedFileClasses = classNames(`${prefix}--file__selected-file`, {
      [`${prefix}--file__selected-file--md`]: size === 'field' || size === 'md',
      [`${prefix}--file__selected-file--sm`]: size === 'small' || size === 'sm',
    });

    return (
      <div className={classes} {...other}>
        {!labelTitle ? null : (
          <Text
            as="h3"
            className={getHelperLabelClasses(`${prefix}--file--label`)}>
            {labelTitle}
          </Text>
        )}
        <Text
          as="p"
          className={getHelperLabelClasses(`${prefix}--label-description`)}
          id={fileUploaderInstanceId}>
          {labelDescription}
        </Text>
        <FileUploaderButton
          innerRef={uploaderButton}
          disabled={disabled}
          labelText={buttonLabel}
          multiple={multiple}
          buttonKind={buttonKind}
          onChange={handleChange}
          disableLabelChanges
          accept={accept}
          name={name}
          size={size}
          aria-describedby={fileUploaderInstanceId}
        />
        <div className={`${prefix}--file-container`}>
          {fileItems.length === 0
            ? null
            : fileItems.map((item, index) => (
                <span
                  key={item.uuid}
                  className={selectedFileClasses}
                  ref={(node) => {
                    nodes[index] = node as HTMLSpanElement;
                  }}
                  {...other}>
                  <Text
                    as="p"
                    className={`${prefix}--file-filename`}
                    id={item.name}>
                    {item.name}
                  </Text>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      name={item.name}
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={(evt) => {
                        if (matches(evt, [keys.Enter, keys.Space])) {
                          handleClick(evt, { index, filenameStatus });
                        }
                      }}
                      onClick={(evt) =>
                        handleClick(evt, { index, filenameStatus })
                      }
                    />
                  </span>
                </span>
              ))}
        </div>
      </div>
    );
  }
) as {
  <ItemType>(props: FileUploaderProps): React.ReactElement<any>;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: any;
};

FileUploader.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of the `<FileUploaderButton>`
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Provide the label text to be read by screen readers when interacting with
   * the `<FileUploaderButton>`
   */
  buttonLabel: PropTypes.string,

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading']).isRequired,

  /**
   * Provide a description for the complete/close icon that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify the description text of this `<FileUploader>`
   */
  labelDescription: PropTypes.string,

  /**
   * Specify the title text of this `<FileUploader>`
   */
  labelTitle: PropTypes.string,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the input is
   * changed
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item
   * is removed
   */
  onDelete: PropTypes.func,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
} as PropTypes.ValidationMap<FileUploaderProps>;

export default FileUploader;
