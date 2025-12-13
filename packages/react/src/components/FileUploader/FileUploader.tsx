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
  useCallback,
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
import { useFeatureFlag } from '../FeatureFlags';

interface FileItem {
  name: string;
  uuid: string;
  file: File & { invalidFileType?: boolean };
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
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize?: number;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (
    event: React.SyntheticEvent<HTMLElement>,
    content: { addedFiles: Array<File & { invalidFileType?: boolean }> }
  ) => void;

  /**
   * Provide an optional `onChange` hook that is called each time the input is changed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Also fires for file deletions and clearFiles operations
   * - Event includes enhanced file information in event.target
   */
  onChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data?: FileChangeData
  ) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item is removed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Event includes deleted file information in event.target
   */
  onDelete?: (
    event: React.SyntheticEvent<HTMLElement>,
    data?: FileDeleteData
  ) => void;

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
   * Get current files (only available when 'enable-enhanced-file-uploader' feature flag is enabled)
   */
  getCurrentFiles?: () => FileItem[];
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
      maxFileSize,
      multiple,
      name,
      onAddFiles,
      onChange,
      onClick,
      onDelete,
      size,
      ...other
    }: FileUploaderProps,
    ref: ForwardedRef<FileUploaderHandle>
  ) => {
    const fileUploaderInstanceId = useId('file-uploader');
    const prefix = usePrefix();

    const enhancedFileUploaderEnabled = useFeatureFlag(
      'enable-enhanced-file-uploader'
    );

    const [fileItems, setFileItems] = useState<FileItem[]>([]);
    const [legacyFileNames, setLegacyFileNames] = useState<
      (string | undefined)[]
    >([]);

    const uploaderButton = React.createRef<HTMLLabelElement>();
    const nodes: HTMLElement[] = [];

    const createFileItem = useCallback(
      (file: File & { invalidFileType?: boolean }): FileItem => ({
        name: file.name,
        uuid: `${fileUploaderInstanceId}-${Date.now()}-${Array.from(
          crypto.getRandomValues(new Uint8Array(8))
        )
          .map((b) => b.toString(36))
          .join('')}`,
        file,
      }),
      [fileUploaderInstanceId]
    );

    /**
     * Validates files based on file size restrictions.
     * Marks invalid files with `invalidFileType: true` but includes them in the result.
     *
     * Note: The `accept` prop is passed to the native HTML input element (`FileUploaderButton`),
     * which provides UI-level filtering in the file picker dialog, but there is no JavaScript validation
     * for file types - users can bypass this by changing the file type filter in the dialog.
     * https://github.com/carbon-design-system/carbon/issues/21166
     */
    const validateFiles = useCallback(
      (
        files: Array<File & { invalidFileType?: boolean }>
      ): Array<File & { invalidFileType?: boolean }> => {
        return files.map((file) => {
          if (maxFileSize && file.size > maxFileSize) {
            file.invalidFileType = true;
          }
          return file;
        });
      },
      [maxFileSize]
    );

    const handleChange = useCallback(
      (evt) => {
        evt.stopPropagation();
        const incomingFiles = Array.from(evt.target.files as FileList);
        const filesToValidate = multiple ? incomingFiles : [incomingFiles[0]];
        const validatedFiles = validateFiles(filesToValidate);

        if (onAddFiles) {
          onAddFiles(evt, { addedFiles: validatedFiles });
        }

        // Filter out invalid files since FileUploader cannot display them
        // (FileUploaderDropContainer returns all files because parent uses FileUploaderItem to display errors)
        // https://github.com/carbon-design-system/carbon/issues/21166
        const validFiles = validatedFiles.filter(
          (file) => !file.invalidFileType
        );

        if (validFiles.length === 0) {
          return;
        }

        if (enhancedFileUploaderEnabled) {
          const newFileItems = validFiles.map(createFileItem);

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
            const allFiles = updatedFileItems.map((item) => item.file);
            const enhancedEvent = {
              ...evt,
              target: {
                ...evt.target,
                files: Object.assign(allFiles, {
                  item: (index: number) => allFiles[index] || null,
                }),
                addedFiles: newFileItems,
                currentFiles: updatedFileItems,
                action: 'add',
              },
            };
            onChange(enhancedEvent);
          }
        } else {
          const filenames = validFiles.map((file) => file.name);

          const updatedFileNames = multiple
            ? [...new Set([...legacyFileNames, ...filenames])]
            : filenames;

          setLegacyFileNames(updatedFileNames);

          if (onChange) {
            onChange(evt);
          }
        }
      },
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        multiple,
        onAddFiles,
        onChange,
        createFileItem,
        validateFiles,
      ]
    );

    const handleClick = useCallback(
      (evt, { index, filenameStatus }) => {
        if (filenameStatus === 'edit') {
          evt.stopPropagation();

          if (enhancedFileUploaderEnabled) {
            const deletedItem = fileItems[index];
            if (!deletedItem) return;

            const remainingItems = fileItems.filter((_, i) => i !== index);
            setFileItems(remainingItems);

            const remainingFiles = remainingItems.map((item) => item.file);

            const enhancedEvent = {
              ...evt,
              target: {
                ...evt.target,
                files: Object.assign(remainingFiles, {
                  item: (index: number) => remainingFiles[index] || null,
                }),
                deletedFile: deletedItem,
                deletedFileName: deletedItem.name,
                remainingFiles: remainingItems,
                currentFiles: remainingItems,
                action: 'remove',
              },
            };

            if (onDelete) {
              onDelete(enhancedEvent);
            }

            if (onChange) {
              onChange(enhancedEvent);
            }
          } else {
            const deletedFileName = legacyFileNames[index];
            const filteredArray = legacyFileNames.filter(
              (filename) => filename !== deletedFileName
            );

            setLegacyFileNames(filteredArray);

            if (onDelete) {
              onDelete(evt);
            }
          }

          if (onClick) {
            onClick(evt);
          }

          uploaderButton.current?.focus?.();
        }
      },
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        onDelete,
        onChange,
        onClick,
        uploaderButton,
      ]
    );

    useImperativeHandle(
      ref,
      () => ({
        clearFiles() {
          if (enhancedFileUploaderEnabled) {
            const previousItems = [...fileItems];
            setFileItems([]);

            if (onChange && previousItems.length > 0) {
              const enhancedEvent = {
                target: {
                  files: Object.assign([], { item: () => null }),
                  clearedFiles: previousItems,
                  currentFiles: [],
                  action: 'clear',
                },
                preventDefault: () => {},
                stopPropagation: () => {},
              } as unknown as React.SyntheticEvent<HTMLElement>;
              onChange(enhancedEvent);
            }
          } else {
            setLegacyFileNames([]);
          }
        },

        ...(enhancedFileUploaderEnabled && {
          getCurrentFiles() {
            return [...fileItems];
          },
        }),
      }),
      [enhancedFileUploaderEnabled, fileItems, onChange]
    );

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

    const displayFiles = enhancedFileUploaderEnabled
      ? fileItems.map((item, index) => ({
          name: item.name,
          key: item.uuid,
          index,
        }))
      : legacyFileNames.map((name, index) => ({ name, key: index, index }));

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
          {displayFiles.length === 0
            ? null
            : displayFiles.map((file) => (
                <span
                  key={file.key}
                  className={selectedFileClasses}
                  ref={(node) => {
                    nodes[file.index] = node as HTMLSpanElement;
                  }}
                  {...other}>
                  <Text
                    as="p"
                    className={`${prefix}--file-filename`}
                    id={
                      enhancedFileUploaderEnabled
                        ? `${fileUploaderInstanceId}-file-${fileItems[file.index]?.uuid || file.index}`
                        : `${fileUploaderInstanceId}-file-${file.index}`
                    }>
                    {file.name}
                  </Text>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      name={file.name}
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={(evt) => {
                        if (matches(evt, [keys.Enter, keys.Space])) {
                          handleClick(evt, {
                            index: file.index,
                            filenameStatus,
                          });
                        }
                      }}
                      onClick={(evt) =>
                        handleClick(evt, { index: file.index, filenameStatus })
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
  (props: FileUploaderProps): React.ReactElement;
  displayName?: string;
  propTypes?: unknown;
  contextTypes?: unknown;
  defaultProps?: unknown;
};

FileUploader.displayName = 'FileUploader';

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
   * The event handler signature looks like `onAddFiles(evt, { addedFiles })`
   */
  onAddFiles: PropTypes.func,

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
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
} as PropTypes.ValidationMap<FileUploaderProps>;

export default FileUploader;
