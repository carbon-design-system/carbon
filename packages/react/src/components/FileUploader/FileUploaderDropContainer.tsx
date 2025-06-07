/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState, type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { keys, matches } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import deprecate from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';

export interface FileUploaderDropContainerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'tabIndex'> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

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
  labelText?: string;

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
    content: { addedFiles: File[] }
  ) => void;

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick?: () => void;

  /**
   * Provide a custom regex pattern for the acceptedTypes
   */
  pattern?: string;

  /**
   * Ref to pass to the inner button element
   */
  innerRef?: React.Ref<HTMLButtonElement>;

  /**
   * @deprecated The `role` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default, and has an implicit role of button.
   */
  role?: string;

  /**
   * @deprecated The `tabIndex` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default.
   */
  tabIndex?: number | string;
}

interface AddedFile extends File {
  invalidFileType?: boolean;
}

function FileUploaderDropContainer({
  accept = [],
  className,
  id,
  disabled,
  labelText = 'Add file',
  multiple = false,
  name,
  onAddFiles = noopFn,
  onClick,
  pattern = '.[0-9a-z]+$',
  // eslint-disable-next-line react/prop-types
  innerRef,
  ...rest
}: FileUploaderDropContainerProps) {
  const prefix = usePrefix();
  const inputRef = useRef<HTMLInputElement>(null);
  const { current: uid } = useRef(id || useId());
  const [isActive, setActive] = useState(false);
  const dropareaClasses = classNames(
    `${prefix}--file__drop-container`,
    `${prefix}--file-browse-btn`,
    {
      [`${prefix}--file__drop-container--drag-over`]: isActive,
      [`${prefix}--file-browse-btn--disabled`]: disabled,
    },
    className
  );

  /**
   * Filters the array of added files based on file type restrictions
   */
  function validateFiles(transferredFiles: AddedFile[]) {
    if (!accept.length) {
      return transferredFiles;
    }
    const acceptedTypes = new Set(accept);
    return transferredFiles.reduce<AddedFile[]>((acc, curr) => {
      const { name, type: mimeType = '' } = curr;
      const fileExtensionRegExp = new RegExp(pattern, 'i');
      const [fileExtension] = name.match(fileExtensionRegExp) ?? [];
      if (fileExtension === undefined) {
        return acc;
      }
      if (
        acceptedTypes.has(mimeType) ||
        acceptedTypes.has(fileExtension.toLowerCase())
      ) {
        return acc.concat([curr]);
      }
      curr.invalidFileType = true;
      return acc.concat([curr]);
    }, []);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])];
    const filesToValidate = multiple ? files : [files[0]];
    const addedFiles = validateFiles(filesToValidate);
    return onAddFiles(event, { addedFiles });
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const files = [...event.dataTransfer.files];
    const filesToValidate = multiple ? files : [files[0]];
    const addedFiles = validateFiles(filesToValidate);
    return onAddFiles(event, { addedFiles });
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`${prefix}--file`}
      onDragOver={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(true);
        evt.dataTransfer.dropEffect = 'copy';
      }}
      onDragLeave={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(false);
        evt.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(false);
        handleDrop(evt);
      }}>
      {/* @ts-expect-error remove this ignore line when the explicit tabIndex prop is deleted */}
      <button
        type="button"
        className={dropareaClasses}
        ref={innerRef}
        onKeyDown={(evt) => {
          if (matches(evt, [keys.Enter, keys.Space])) {
            evt.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={composeEventHandlers([onClick, handleClick])}
        {...rest}>
        {labelText}
      </button>
      <label htmlFor={uid} className={`${prefix}--visually-hidden`}>
        {labelText}
      </label>
      <input
        type="file"
        id={uid}
        className={`${prefix}--file-input`}
        ref={inputRef}
        tabIndex={-1}
        disabled={disabled}
        accept={accept.join(',')}
        name={name}
        multiple={multiple}
        onChange={handleChange}
        onClick={(evt) => {
          (evt.target as HTMLInputElement).value = '';
        }}
      />
    </div>
  );
}

FileUploaderDropContainer.propTypes = {
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
  labelText: PropTypes.string.isRequired,

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
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a custom regex pattern for the acceptedTypes
   */
  pattern: PropTypes.string,

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role: deprecate(
    PropTypes.number,
    'The `role` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default, and has an implicit role of button.'
  ),

  /**
   * Provide a custom tabIndex value for the `<FileUploaderButton>`
   */
  tabIndex: deprecate(
    PropTypes.number,
    'The `tabIndex` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default.'
  ),
};

export default FileUploaderDropContainer;
