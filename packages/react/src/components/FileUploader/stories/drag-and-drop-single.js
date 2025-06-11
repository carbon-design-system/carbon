/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import { useId } from '../../../internal/useId';

const prefix = 'cds';

const ExampleDropContainerApp = (props) => {
  const [file, setFile] = useState();
  const uploaderButton = useRef(null);
  const uniqueId = useId();
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

  const uploadFile = async (fileToUpload) => {
    // file size validation
    if (fileToUpload[0].filesize > 512000) {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: '500 KB max file size. Select a new file and try again.',
      };
      setFile(updatedFile);
      return;
    }

    // file type validation
    if (fileToUpload.invalidFileType) {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
      };
      setFile(updatedFile);
      return;
    }

    // simulate network request time
    const rand = Math.random() * 1000;
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFile(updatedFile);
    }, rand);

    // show x icon after 1 second
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
      };
      setFile(updatedFile);
    }, rand + 1000);
  };

  const onAddFilesButton = (event, { addedFiles }) => {
    const file = addedFiles;

    const newFile = [
      {
        uuid: uniqueId + file[0].name + file[0].size,
        name: file[0].name,
        filesize: file[0].size,
        status: 'uploading',
        iconDescription: 'Uploading',
        invalidFileType: file[0].invalidFileType,
      },
    ];

    setFile(newFile[0]);
    uploadFile([newFile[0]]);
  };

  const handleFileUploaderItemClick = () => {
    setFile();
  };

  const labelClasses = classnames(`${prefix}--file--label`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--file--label--disabled`]: props.disabled,
  });

  const helperTextClasses = classnames(`${prefix}--label-description`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--label-description--disabled`]: props.disabled,
  });

  return (
    <FormItem>
      <p className={labelClasses}>Upload files</p>
      <p className={helperTextClasses}>
        Max file size is 500kb. Supported file types are .jpg and .png.
      </p>
      {file === undefined && (
        <FileUploaderDropContainer
          {...props}
          onAddFiles={onAddFilesButton}
          innerRef={uploaderButton}
        />
      )}

      <div
        className={classnames(
          `${prefix}--file-container`,
          `${prefix}--file-container--drop`
        )}>
        {file !== undefined && (
          <FileUploaderItem
            key={file.uuid}
            uuid={file.uuid}
            name={file.name}
            filesize={file.filesize}
            errorSubject="File size exceeds limit"
            errorBody="500 KB max file size. Select a new file and try again."
            // eslint-disable-next-line react/prop-types
            size={props.size}
            status={file.status}
            iconDescription={file.iconDescription}
            invalid={file.invalid}
            onDelete={handleFileUploaderItemClick}
            onAddFiles={onAddFilesButton}
          />
        )}
      </div>
    </FormItem>
  );
};

export default ExampleDropContainerApp;
