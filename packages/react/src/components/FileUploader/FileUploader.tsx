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

import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { ButtonKinds } from '../Button/Button';
import { Text } from '../Text';
import FileUploaderButton from './FileUploaderButton';
import FileUploaderItem from './FileUploaderItem';

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
   * Provide an optional `onChange` hook that is called each time the input is
   * changed
   */
  onChange?: (event: any) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick?: (event: any) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item
   * is removed
   */
  onDelete?: (event: any) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';

  /**
   * A function used to render a custom name for each file object.
   */
  renderFileName?: (props: { name: string | undefined }) => React.ReactNode;

  /**
   * A function used to render a custom actions for each file object.
   */
  renderFileActions?: (props: {
    name: string | undefined;
    status: string;
  }) => React.ReactNode;
}

export interface FileUploaderHandle {
  /**
   * Clear internal state
   */
  clearFiles: () => void;
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
      renderFileName,
      renderFileActions,
      ...other
    }: FileUploaderProps,
    ref: ForwardedRef<FileUploaderHandle>
  ) => {
    const fileUploaderInstanceId = useId('file-uploader');
    const [state, updateState] = useState({
      fileNames: [] as (string | undefined)[],
    });
    const prefix = usePrefix();
    const handleChange = (evt) => {
      evt.stopPropagation();
      const filenames = Array.prototype.map.call(
        evt.target.files,
        (file) => file.name
      ) as string[];
      updateState((prevState) => ({
        fileNames: multiple
          ? [...new Set([...prevState.fileNames, ...filenames])]
          : filenames,
      }));
      if (onChange) {
        onChange(evt);
      }
    };

    const handleClick = (evt, { index, filenameStatus }) => {
      if (filenameStatus === 'edit') {
        evt.stopPropagation();
        const filteredArray = state.fileNames.filter((_, i) => index !== i);

        updateState({ fileNames: filteredArray });

        if (onDelete) {
          onDelete(evt);
          uploaderButton.current?.focus?.();
        }
        onClick?.(evt);
      }
    };

    useImperativeHandle(ref, () => ({
      clearFiles() {
        updateState({ fileNames: [] });
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
          {state.fileNames.length === 0
            ? null
            : state.fileNames.map((name, index) => (
                <FileUploaderItem
                  key={index}
                  className={selectedFileClasses}
                  name={name}
                  status={filenameStatus}
                  iconDescription={iconDescription}
                  onDelete={(evt) =>
                    handleClick(evt, { index, filenameStatus })
                  }
                  renderName={renderFileName}
                  renderActions={renderFileActions}
                  {...other}
                />
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

  /**
   * A function used to render a custom name for each file object.
   */
  renderFileName: PropTypes.func,

  /**
   * A function used to render a custom actions for each file object.
   */
  renderFileActions: PropTypes.func,
} as PropTypes.ValidationMap<FileUploaderProps>;

export default FileUploader;
