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
  file: File;
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
   * Provide an optional `onChange` hook that is called each time the input is changed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Also fires for file deletions and clearFiles operations
   * - Event includes enhanced file information in event.target
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  onChange?: (event: any, data?: FileChangeData) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  onClick?: (event: any) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item is removed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Event includes deleted file information in event.target
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
   * Get current files (only available when 'enable-enhanced-file-uploader' feature flag is enabled)
   */
  getCurrentFiles?: () => FileItem[];
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
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
    const prefix = usePrefix();

    const enhancedFileUploaderEnabled = useFeatureFlag(
      'enable-enhanced-file-uploader'
    );

    const [fileItems, setFileItems] = useState<FileItem[]>([]);
    const [legacyFileNames, setLegacyFileNames] = useState<
      (string | undefined)[]
    >([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    const [fileObjects, setFileObjects] = useState<Map<string, File>>(
      new Map()
    );

    const nodes: HTMLElement[] = [];

    const createFileItem = (file: File): FileItem => ({
      name: file.name,
      uuid: `${fileUploaderInstanceId}-${Date.now()}-${Array.from(
        crypto.getRandomValues(new Uint8Array(8))
      )
        .map((b) => b.toString(36))
        .join('')}`,
      file,
    });

    const handleChange = useCallback(
      (evt) => {
        evt.stopPropagation();
        const newFiles = Array.from(evt.target.files as FileList);

        if (enhancedFileUploaderEnabled) {
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
          const filenames = newFiles.map((file) => file.name);

          const updatedFileNames = multiple
            ? [...new Set([...legacyFileNames, ...filenames])]
            : filenames;

          setLegacyFileNames(updatedFileNames);

          setFileObjects((prevMap) => {
            const newMap = multiple ? new Map(prevMap) : new Map();
            newFiles.forEach((file) => {
              newMap.set(file.name, file);
            });
            return newMap;
          });

          if (onChange) {
            onChange(evt);
          }
        }
      },
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        multiple,
        onChange,
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

            // Update File objects
            setFileObjects((prevMap) => {
              const newMap = new Map(prevMap);
              if (deletedFileName) {
                newMap.delete(deletedFileName);
              }
              return newMap;
            });

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
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        onDelete,
        onChange,
        onClick,
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
              };
              onChange(enhancedEvent);
            }
          } else {
            setLegacyFileNames([]);
            setFileObjects(new Map());
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any , @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  <ItemType>(props: FileUploaderProps): React.ReactElement<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  contextTypes?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
} as PropTypes.ValidationMap<FileUploaderProps>;

export default FileUploader;
