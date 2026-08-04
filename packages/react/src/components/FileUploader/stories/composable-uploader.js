/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import FileUploaderButton from '../FileUploaderButton';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import { useId } from '../../../internal/useId';

const prefix = 'cds';

/**
 * ComposableFileUploader demonstrates how to build a complete file uploader
 * experience using individual primitives instead of the monolithic FileUploader component.
 *
 * This example shows:
 * - Using FileUploaderButton for file selection
 * - Using FileUploaderItem to display uploaded files
 * - Using FileUploaderDropContainer for drag-and-drop (optional)
 * - Managing multiple file uploads with proper state
 * - Handling file validation (size and type)
 * - Managing upload states (uploading, complete, error)
 */
const ComposableFileUploader = (props) => {
  const {
    // General props
    disabled = false,
    useDragAndDrop = false,
    // FileUploaderButton props
    '<FileUploaderButton> - labelText': buttonLabelText = 'Add files',
    '<FileUploaderButton> - buttonKind': buttonKind = 'primary',
    '<FileUploaderButton> - disabled': buttonDisabled = false,
    '<FileUploaderButton> - disableLabelChanges': disableLabelChanges = false,
    '<FileUploaderButton> - accept': buttonAccept = ['.jpg', '.png'],
    '<FileUploaderButton> - multiple': buttonMultiple = true,
    '<FileUploaderButton> - name': buttonName = '',
    '<FileUploaderButton> - size': buttonSize = 'md',
    '<FileUploaderButton> - className': buttonClassName = '',
    '<FileUploaderButton> - id': buttonId = '',
    // FileUploaderItem props
    '<FileUploaderItem> - iconDescription': itemIconDescription = 'Delete file',
    '<FileUploaderItem> - status': itemStatus = 'uploading',
    '<FileUploaderItem> - invalid': itemInvalid = false,
    '<FileUploaderItem> - errorSubject': itemErrorSubject = '',
    '<FileUploaderItem> - errorBody': itemErrorBody = '',
    '<FileUploaderItem> - size': itemSize = 'md',
    '<FileUploaderItem> - className': itemClassName = '',
    '<FileUploaderItem> - disabled': itemDisabled = false,
    // FileUploaderDropContainer props
    '<FileUploaderDropContainer> - labelText':
      dropContainerLabelText = 'Drag and drop files here or click to upload',
    '<FileUploaderDropContainer> - accept': dropContainerAccept = [
      '.jpg',
      '.png',
      'image/jpeg',
      'image/png',
    ],
    '<FileUploaderDropContainer> - multiple': dropContainerMultiple = true,
    '<FileUploaderDropContainer> - className': dropContainerClassName = '',
    '<FileUploaderDropContainer> - id': dropContainerId = '',
    '<FileUploaderDropContainer> - disabled': dropContainerDisabled = false,
    '<FileUploaderDropContainer> - maxFileSize':
      dropContainerMaxFileSize = 1024 * 1024,
    '<FileUploaderDropContainer> - name': dropContainerName = '',
    '<FileUploaderDropContainer> - pattern':
      dropContainerPattern = '.[0-9a-z]+$',
  } = props;

  const [files, setFiles] = useState([]);
  const uploaderButton = useRef(null);
  const uniqueId = useId();

  // Prevent default drag and drop behavior on the document
  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleDragover = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragover);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragover);
    };
  }, []);

  /**
   * Simulates file upload with validation
   * Validates file size and type, then simulates network request
   */
  const uploadFile = async (fileToUpload) => {
    // File size validation (500KB limit)
    if (fileToUpload.filesize > 512000) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: '500 KB max file size. Select a new file and try again.',
      };

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.uuid === fileToUpload.uuid ? updatedFile : f))
      );
      return;
    }

    // File type validation
    if (fileToUpload.invalidFileType) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
      };

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.uuid === fileToUpload.uuid ? updatedFile : f))
      );
      return;
    }

    // Simulate network request time (random delay)
    const rand = Math.random() * 1000;

    // Update to complete status after simulated upload
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'complete',
        iconDescription: 'Upload complete',
      };

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.uuid === fileToUpload.uuid ? updatedFile : f))
      );
    }, rand);

    // Show delete icon after upload completes
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
      };

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.uuid === fileToUpload.uuid ? updatedFile : f))
      );
    }, rand + 1000);
  };

  /**
   * Handles file addition from FileUploaderButton
   */
  const handleAddFilesButton = (event) => {
    const addedFiles = Array.from(event.target.files || []);

    if (addedFiles.length === 0) return;

    // Create file objects with metadata
    const newFiles = addedFiles.map((file) => ({
      uuid: uniqueId + file.name + file.size + Date.now(),
      name: file.name,
      filesize: file.size,
      status: 'uploading',
      iconDescription: 'Uploading',
      invalidFileType: false,
    }));

    // Add new files to state
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Start upload process for each file
    newFiles.forEach((file) => {
      uploadFile(file);
    });
  };

  /**
   * Handles file addition from FileUploaderDropContainer
   */
  const handleAddFilesDropContainer = (event, { addedFiles }) => {
    if (addedFiles.length === 0) return;

    // Create file objects with metadata
    const newFiles = addedFiles.map((file) => ({
      uuid: uniqueId + file.name + file.size + Date.now(),
      name: file.name,
      filesize: file.size,
      status: 'uploading',
      iconDescription: 'Uploading',
      invalidFileType: file.invalidFileType || false,
    }));

    // Add new files to state
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Start upload process for each file
    newFiles.forEach((file) => {
      uploadFile(file);
    });
  };

  /**
   * Handles file deletion
   */
  const handleFileDelete = (event, { uuid }) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.uuid !== uuid));
  };

  const labelClasses = classnames(`${prefix}--file--label`, {
    [`${prefix}--file--label--disabled`]: disabled,
  });

  const helperTextClasses = classnames(`${prefix}--label-description`, {
    [`${prefix}--label-description--disabled`]: disabled,
  });

  return (
    <FormItem>
      <p className={labelClasses}>Upload files</p>
      <p className={helperTextClasses}>
        Max file size is 500KB. Supported file types are .jpg and .png.
      </p>

      {/* Optional: Drag and drop container */}
      {useDragAndDrop && (
        <FileUploaderDropContainer
          labelText={dropContainerLabelText}
          accept={dropContainerAccept}
          multiple={dropContainerMultiple}
          disabled={dropContainerDisabled}
          className={dropContainerClassName}
          id={dropContainerId}
          maxFileSize={dropContainerMaxFileSize}
          name={dropContainerName}
          pattern={dropContainerPattern}
          onAddFiles={handleAddFilesDropContainer}
          innerRef={uploaderButton}
        />
      )}

      {/* File upload button - primary upload mechanism */}
      {!useDragAndDrop && (
        <FileUploaderButton
          labelText={buttonLabelText}
          buttonKind={buttonKind}
          size={buttonSize}
          disabled={buttonDisabled}
          disableLabelChanges={disableLabelChanges}
          accept={buttonAccept}
          multiple={buttonMultiple}
          name={buttonName}
          className={buttonClassName}
          id={buttonId}
          onChange={handleAddFilesButton}
        />
      )}

      {/* File list container */}
      <div
        className={classnames(`${prefix}--file-container`, {
          [`${prefix}--file-container--drop`]: useDragAndDrop,
        })}>
        {files.map((file) => (
          <FileUploaderItem
            key={file.uuid}
            uuid={file.uuid}
            name={file.name}
            filesize={file.filesize}
            size={props['<FileUploaderItem> - size'] ?? itemSize}
            status={props['<FileUploaderItem> - status'] ?? file.status}
            iconDescription={
              props['<FileUploaderItem> - iconDescription'] ??
              (file.iconDescription || itemIconDescription)
            }
            invalid={props['<FileUploaderItem> - invalid'] ?? file.invalid}
            errorSubject={
              props['<FileUploaderItem> - errorSubject'] ?? file.errorSubject
            }
            errorBody={
              props['<FileUploaderItem> - errorBody'] ?? file.errorBody
            }
            disabled={props['<FileUploaderItem> - disabled'] ?? itemDisabled}
            className={props['<FileUploaderItem> - className'] ?? itemClassName}
            onDelete={handleFileDelete}
          />
        ))}
      </div>
    </FormItem>
  );
};

export default ComposableFileUploader;

// Made with Bob
