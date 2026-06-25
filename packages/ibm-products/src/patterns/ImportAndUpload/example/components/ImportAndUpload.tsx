/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  FileUploaderDropContainer,
  FileUploaderItem,
  TextInput,
} from '@carbon/react';

const blockClass = 'import-and-upload-modal';

interface FileData {
  uuid: string;
  status: 'uploading' | 'edit' | 'complete';
  iconDescription: string;
  name: string;
  fileSize?: number;
  invalidFileType?: boolean;
  fileData?: File;
  fetchError?: boolean;
  errorBody?: string;
  errorSubject?: string;
  invalid?: boolean;
}

export interface ImportAndUploadProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (files: FileData[]) => void;
  title?: string;
  /** Story-specific description shown at the top of the modal body */
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  preventCloseOnClickOutside?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Accepted file types, e.g. ['image/png', '.json'] */
  accept?: string[];
  /** Maximum file size in bytes (default: 500000 = 500KB) */
  maxFileSize?: number;
  /** Story-specific label shown above the drag-and-drop area */
  fileDropHeader: string;
  /** Label shown above the URL input */
  urlInputLabel?: string;
}

export const ImportAndUpload = ({
  open,
  onClose,
  onSubmit,
  title = 'Import',
  description,
  primaryButtonText = 'Import',
  secondaryButtonText = 'Cancel',
  preventCloseOnClickOutside = false,
  size = 'sm',
  accept = [],
  maxFileSize = 500000,
  fileDropHeader,
  urlInputLabel = 'Add a file by specifying a URL',
}: ImportAndUploadProps) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [importUrl, setImportUrl] = useState('');

  const acceptSet = new Set(accept);

  const isInvalidFileType = (file: File) => {
    if (
      acceptSet.has(file.type) ||
      acceptSet.has(`.${file.name.split('.').pop()}`) ||
      accept.length === 0
    ) {
      return false;
    }
    return true;
  };

  const updateFiles = (newFiles: any[]) => {
    const updatedFiles = newFiles.map((file) => {
      const newFile: FileData = {
        uuid: file.uuid || 'test',
        status: 'edit',
        iconDescription: 'Delete',
        name: file.name,
        fileSize: file.size,
        invalidFileType: file.invalidFileType,
        fileData: file,
        fetchError: file.fetchError,
      };
      if (newFile.fetchError) {
        newFile.errorBody = 'Unable to fetch URL.';
        newFile.errorSubject = 'Import failed';
        newFile.invalid = true;
      } else if (newFile.invalidFileType) {
        newFile.errorBody = 'Invalid file type.';
        newFile.errorSubject = 'Import failed';
        newFile.invalid = true;
      } else if ((newFile?.fileSize ?? 0) > maxFileSize) {
        newFile.errorBody = `${Math.round(maxFileSize / 1000)}kb max file size. Select a new file and try again.`;
        newFile.errorSubject = 'Import failed';
        newFile.invalid = true;
      }
      return newFile;
    });
    setFiles([...updatedFiles]);
  };

  const fetchFile = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const fileName = importUrl
      .substring(importUrl.lastIndexOf('/') + 1)
      .split('?')[0];
    const pendingFile: FileData = {
      name: fileName,
      status: 'uploading',
      uuid: 'test',
      iconDescription: 'Delete',
    };
    setFiles([pendingFile]);
    try {
      const response = await fetch(importUrl);
      if (!response.ok || response.status !== 200) {
        throw new Error(`${response.status}`);
      }
      const blob = await response.blob();
      const fetchedFile: any = new File([blob], fileName, { type: blob.type });
      fetchedFile.invalidFileType = isInvalidFileType(fetchedFile);
      fetchedFile.uuid = pendingFile.uuid;
      updateFiles([fetchedFile]);
    } catch (err) {
      updateFiles([{ ...pendingFile, fetchError: true }]);
    }
  };

  const onRemoveFile = (uuid: string) => {
    setFiles((prev) => prev.filter((f) => f.uuid !== uuid));
  };

  const onAddFile = (
    evt: React.SyntheticEvent<HTMLElement>,
    { addedFiles }: { addedFiles: File[] }
  ) => {
    evt.stopPropagation();
    updateFiles(addedFiles);
  };

  const handleClose = () => {
    setFiles([]);
    setImportUrl('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(files);
    handleClose();
  };

  const numberOfFiles = files.length;
  const numberOfValidFiles = files.filter((f) => !f.invalid).length;
  const hasFiles = numberOfFiles > 0;
  const primaryButtonDisabled = !hasFiles || numberOfValidFiles === 0;
  const importButtonDisabled = !importUrl || hasFiles;
  const fileStatusString = `${numberOfValidFiles} / ${numberOfFiles} file uploaded`;

  return (
    <ComposedModal
      open={open}
      size={size}
      preventCloseOnClickOutside={preventCloseOnClickOutside}
      onClose={handleClose}
    >
      <ModalHeader
        className={`${blockClass}__header`}
        title={title}
        closeModal={handleClose}
      />
      <ModalBody className={`${blockClass}__body-container`}>
        <p className={`${blockClass}__body`}>{description}</p>
        <p className={`${blockClass}__file-drop-header`}>{fileDropHeader}</p>
        <FileUploaderDropContainer
          accept={accept}
          labelText="Drag and drop files here or click to upload"
          onAddFiles={onAddFile}
          disabled={hasFiles}
          data-modal-primary-focus
        />
        <p className={`${blockClass}__label`}>{urlInputLabel}</p>
        <div className={`${blockClass}__input-group`}>
          <TextInput
            labelText=""
            id="import-url-input"
            onChange={(evt) => setImportUrl(evt.target.value)}
            placeholder="URL"
            value={importUrl}
            disabled={hasFiles}
            aria-label={urlInputLabel}
          />
          <Button
            onClick={fetchFile}
            className={`${blockClass}__import-button`}
            size="md"
            disabled={importButtonDisabled}
          >
            Add file
          </Button>
        </div>
        <div className={`${blockClass}__file-container`}>
          {hasFiles && (
            <p className={`${blockClass}__helper-text`}>{fileStatusString}</p>
          )}
          {files.map((file) => (
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
              {...{ filesize: file.fileSize }}
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter className={`${blockClass}__footer`}>
        <Button type="button" kind="secondary" onClick={handleClose}>
          {secondaryButtonText}
        </Button>
        <Button
          type="submit"
          kind="primary"
          onClick={handleSubmit}
          disabled={primaryButtonDisabled}
        >
          {primaryButtonText}
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

ImportAndUpload.displayName = 'ImportAndUpload';
