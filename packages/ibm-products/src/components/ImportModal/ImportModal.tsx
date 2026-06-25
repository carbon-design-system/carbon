/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Button,
  ComposedModal,
  FileUploaderDropContainer,
  FileUploaderItem,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  usePrefix,
} from '@carbon/react';
import React, { ForwardedRef, ReactNode, forwardRef, useState } from 'react';

import { Add } from '@carbon/react/icons';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import uuidv4 from '../../global/js/utils/uuidv4';

const componentName = 'ImportModal';

type FileType = {
  fetchError?: undefined | boolean;
  fileData?: File;
  fileSize?: number;
  iconDescription?: string;
  invalidFileType?: boolean;
  name: string;
  status?: 'uploading' | 'edit' | 'complete';
  uuid?: string;
  invalid?: boolean;
  errorBody?: string;
  errorSubject?: string;
};

export interface ImportModalProps {
  /**
   * Specifies the file types that are valid for importing
   */
  accept?: string[];
  /**
   * Optional class name
   */
  className?: string;
  /**
   * The default message shown for an import error
   */
  defaultErrorBody: string;
  /**
   * The default header that is displayed to show an error message
   */
  defaultErrorHeader: string;
  /**
   * Content that is displayed inside the modal
   */
  description?: string;
  /**
   * Optional error body to display specifically for a fetch error
   */
  fetchErrorBody?: string;
  /**
   * Optional error header to display specifically for a fetch error
   */
  fetchErrorHeader?: string;
  /**
   * Header for the drag and drop box
   */
  fileDropHeader?: string;
  /**
   * Label for the drag and drop box
   */
  fileDropLabel?: string;
  /**
   * Label that appears when a file is uploaded to show number of files (1 / 1)
   */
  fileUploadLabel?: string;
  /**
   * Hide input label
   */
  hideInputLabel?: boolean;
  /**
   * Button icon for import by url button
   */
  inputButtonIcon?: boolean;
  /**
   * Button text for import by url button
   */
  inputButtonText: string;
  /**
   * ID for text input
   */
  inputId?: string;
  /**
   * Header to display above import by url
   */
  inputLabel: string;
  /**
   * Placeholder for text input
   */
  inputPlaceholder?: string;
  /**
   * Optional error message to display specifically for a invalid file type error
   */
  invalidFileTypeErrorBody?: string;
  /**
   * Optional error header to display specifically for a invalid file type error
   */
  invalidFileTypeErrorHeader?: string;
  /**
   * Description for delete file icon
   */
  invalidIconDescription?: string;
  /**
   * File size limit in bytes
   */
  maxFileSize?: number;
  /**
   * Optional error message to display specifically for a max file size error
   */
  maxFileSizeErrorBody?: string;
  /**
   * Optional error header to display specifically for a max file size error
   */
  maxFileSizeErrorHeader?: string;
  /**
   * Specify a handler for closing modal
   */
  onClose?(): void;
  /**
   * Specify a handler for "submitting" modal. Access the imported file via `file => {}`
   */
  onRequestSubmit(files: FileType[]): void;
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: ReactNode;
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: string;
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: string;
  /**
   * The text displayed at the top of the modal
   */
  title: string;
}

export const ImportModal: React.FC<ImportModalProps> = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      accept = [],
      className,
      defaultErrorBody,
      defaultErrorHeader,
      description,
      fetchErrorBody,
      fetchErrorHeader,
      fileDropHeader,
      fileDropLabel,
      fileUploadLabel,
      hideInputLabel,
      inputButtonIcon,
      inputButtonText,
      inputId,
      inputLabel,
      inputPlaceholder,
      invalidFileTypeErrorBody,
      invalidFileTypeErrorHeader,
      invalidIconDescription,
      maxFileSize,
      maxFileSizeErrorBody,
      maxFileSizeErrorHeader,
      onClose,
      onRequestSubmit,
      open,
      portalTarget: portalTargetIn,
      primaryButtonText,
      secondaryButtonText,
      title,

      // Collect any other property values passed in.
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const carbonPrefix = usePrefix();
    const [files, setFiles] = useState<Array<FileType>>([]);
    const [importUrl, setImportUrl] = useState('');
    const renderPortalUse = usePortalTarget(portalTargetIn);

    const isInvalidFileType = (file) => {
      const acceptSet = new Set(accept);
      const name = file.name;
      const mimeType = file.type;
      const extension = `.${name.split('.').pop()}`;
      if (
        acceptSet.has(mimeType) ||
        acceptSet.has(extension) ||
        accept.length === 0
      ) {
        return false;
      }
      return true;
    };

    const updateFiles = (newFiles) => {
      const updatedFiles = newFiles.map((file) => {
        const newFile = {
          uuid: file.uuid || uuidv4(),
          status: 'edit',
          iconDescription: invalidIconDescription,
          name: file.name,
          fileSize: file.size,
          invalidFileType: file.invalidFileType,
          fileData: file,
          fetchError: file.fetchError,
        } as FileType;
        if (newFile.fetchError) {
          newFile.errorBody = fetchErrorBody || defaultErrorBody;
          newFile.errorSubject = fetchErrorHeader || defaultErrorHeader;
          newFile.invalid = true;
        } else if (newFile.invalidFileType) {
          newFile.errorBody = invalidFileTypeErrorBody || defaultErrorBody;
          newFile.errorSubject =
            invalidFileTypeErrorHeader || defaultErrorHeader;
          newFile.invalid = true;
        } else if (maxFileSize && (newFile?.fileSize ?? 0) > maxFileSize) {
          newFile.errorBody = maxFileSizeErrorBody || defaultErrorBody;
          newFile.errorSubject = maxFileSizeErrorHeader || defaultErrorHeader;
          newFile.invalid = true;
        }
        return newFile;
      });
      const finalFiles = [...updatedFiles];
      setFiles(finalFiles);
    };

    const fetchFile = async (evt) => {
      evt.preventDefault();
      const fileName = importUrl
        .substring(importUrl.lastIndexOf('/') + 1)
        .split('?')[0];
      const pendingFile: FileType = {
        name: fileName,
        status: 'uploading',
        uuid: uuidv4(),
      };
      setFiles([pendingFile]);
      try {
        const response = await fetch(importUrl);
        if (!response.ok || response.status !== 200) {
          throw new Error(`${response.status}`);
        }
        const blob = await response.blob();
        const fetchedFile: FileType = new File([blob], fileName, {
          type: blob.type,
        });
        fetchedFile.invalidFileType = isInvalidFileType(fetchedFile);
        fetchedFile.uuid = pendingFile.uuid;
        updateFiles([fetchedFile]);
      } catch (err) {
        const failedFile = {
          ...pendingFile,
          fetchError: true,
        };
        updateFiles([failedFile]);
      }
    };

    const onAddFile = (evt, { addedFiles }) => {
      evt.stopPropagation();
      updateFiles(addedFiles);
    };

    const onRemoveFile = (uuid) => {
      const updatedFiles = files.filter((f: FileType) => f.uuid !== uuid);
      setFiles(updatedFiles);
    };

    const onSubmitHandler = () => {
      onRequestSubmit(files);
    };

    const inputHandler = (evt) => {
      setImportUrl(evt.target.value);
    };

    const onCloseHandler = () => {
      setFiles([]);
      setImportUrl('');
      if (onClose) {
        onClose();
      }
    };

    const numberOfFiles = files.length;
    const numberOfValidFiles = files.filter((f: FileType) => !f.invalid).length;
    const hasFiles = numberOfFiles > 0;
    const primaryButtonDisabled = !hasFiles || !(numberOfValidFiles > 0);
    const importButtonDisabled = !importUrl || hasFiles;
    const fileStatusString = `${numberOfValidFiles} / ${numberOfFiles} ${fileUploadLabel}`;
    const blockClass = `${pkg.prefix}--import-modal`;

    return renderPortalUse(
      <ComposedModal
        {...rest}
        {...{ open, ref, ...getDevtoolsProps(componentName) }}
        aria-label={title}
        className={cx(blockClass, className)}
        size="sm"
        preventCloseOnClickOutside
        onClose={onCloseHandler}
      >
        <ModalHeader className={`${blockClass}__header`} title={title} />
        <ModalBody className={`${blockClass}__body-container`}>
          {description && (
            <p className={`${blockClass}__body`}>{description}</p>
          )}
          {fileDropHeader && (
            <p className={`${blockClass}__file-drop-header`}>
              {fileDropHeader}
            </p>
          )}
          <FileUploaderDropContainer
            accept={accept}
            labelText={fileDropLabel}
            onAddFiles={onAddFile}
            disabled={hasFiles}
            data-modal-primary-focus
          />
          <div className={`${blockClass}__input-group`}>
            <TextInput
              labelText={<p className={`${blockClass}__label`}>{inputLabel}</p>}
              id={inputId || ''}
              onChange={inputHandler}
              placeholder={inputPlaceholder}
              value={importUrl}
              disabled={hasFiles}
              aria-label={inputLabel}
              hideLabel={hideInputLabel}
            />
            <Button
              onClick={fetchFile}
              className={`${blockClass}__import-button`}
              size="md"
              disabled={importButtonDisabled}
              renderIcon={
                inputButtonIcon
                  ? (props) => <Add size={20} {...props} />
                  : undefined
              }
            >
              {inputButtonText}
            </Button>
          </div>
          <div
            className={`${carbonPrefix}--file-container ${blockClass}__file-container`}
          >
            {hasFiles && (
              <p className={`${blockClass}__helper-text`}>{fileStatusString}</p>
            )}
            {files.map((file: FileType) => (
              <FileUploaderItem
                key={file.uuid}
                onDelete={() => onRemoveFile(file.uuid)}
                name={file.name}
                status={file.status}
                size="lg"
                uuid={file.uuid}
                iconDescription={file.iconDescription}
                invalid={file.invalid}
                errorBody={file.errorBody}
                errorSubject={file.errorSubject}
                {...{
                  filesize: file.fileSize /* cspell:disable-line */,
                }}
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className={`${blockClass}__footer`}>
          <Button type="button" kind="secondary" onClick={onCloseHandler}>
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={onSubmitHandler}
            disabled={primaryButtonDisabled}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

ImportModal.propTypes = {
  /**
   * Specifies the file types that are valid for importing
   */
  accept: PropTypes.array,
  /**
   * Optional class name
   */
  className: PropTypes.string,
  /**
   * The default message shown for an import error
   */
  defaultErrorBody: PropTypes.string.isRequired,
  /**
   * The default header that is displayed to show an error message
   */
  defaultErrorHeader: PropTypes.string.isRequired,
  /**
   * Content that is displayed inside the modal
   */
  description: PropTypes.string,
  /**
   * Optional error body to display specifically for a fetch error
   */
  fetchErrorBody: PropTypes.string,
  /**
   * Optional error header to display specifically for a fetch error
   */
  fetchErrorHeader: PropTypes.string,
  /**
   * Header for the drag and drop box
   */
  fileDropHeader: PropTypes.string,
  /**
   * Label for the drag and drop box
   */
  fileDropLabel: PropTypes.string,
  /**
   * Label that appears when a file is uploaded to show number of files (1 / 1)
   */
  fileUploadLabel: PropTypes.string,
  /**
   * Hide input label
   */
  hideInputLabel: PropTypes.bool,
  /**
   * Button icon for import by url button
   */
  inputButtonIcon: PropTypes.bool,
  /**
   * Button text for import by url button
   */
  inputButtonText: PropTypes.string.isRequired,
  /**
   * ID for text input
   */
  inputId: PropTypes.string,
  /**
   * Header to display above import by url
   */
  inputLabel: PropTypes.string.isRequired,
  /**
   * Placeholder for text input
   */
  inputPlaceholder: PropTypes.string,
  /**
   * Optional error message to display specifically for a invalid file type error
   */
  invalidFileTypeErrorBody: PropTypes.string,
  /**
   * Optional error header to display specifically for a invalid file type error
   */
  invalidFileTypeErrorHeader: PropTypes.string,
  /**
   * Description for delete file icon
   */
  invalidIconDescription: PropTypes.string,
  /**
   * File size limit in bytes
   */
  maxFileSize: PropTypes.number,
  /**
   * Optional error message to display specifically for a max file size error
   */
  maxFileSizeErrorBody: PropTypes.string,
  /**
   * Optional error header to display specifically for a max file size error
   */
  maxFileSizeErrorHeader: PropTypes.string,
  /**
   * Specify a handler for closing modal
   */
  onClose: PropTypes.func,
  /**
   * Specify a handler for "submitting" modal. Access the imported file via `file => {}`
   */
  onRequestSubmit: PropTypes.func.isRequired,
  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool.isRequired,
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string.isRequired,
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string.isRequired,
  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes.string.isRequired,
};

ImportModal.displayName = componentName;
