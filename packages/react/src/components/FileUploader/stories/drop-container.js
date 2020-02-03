/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import { settings } from 'carbon-components';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import uid from '../../../tools/uniqueId';

const { prefix } = settings;

function ExampleDropContainerApp(props) {
  const [files, setFiles] = useState([]);
  const uploadFile = async fileToUpload => {
    // file size validation
    if (fileToUpload.size > 512000) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: '500kb max file size. Select a new file and try again.',
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      return;
    }

    // simulate network request time
    const rand = Math.random() * 1000;
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
    }, rand);

    // show x icon after 1 second
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
    }, rand + 1000);
  };
  const onAddFiles = useCallback(
    (evt, { addedFiles }) => {
      evt.stopPropagation();
      const newFiles = addedFiles.map(file => ({
        uuid: uid(),
        name: file.name,
        size: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
      }));
      props.multiple
        ? setFiles([...files, ...newFiles])
        : setFiles([...files, newFiles[0]]);
      newFiles.forEach(uploadFile);
    },
    [files, props.multiple]
  );
  const handleFileUploaderItemClick = useCallback(
    (evt, { uuid: clickedUuid }) =>
      setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
    [files]
  );
  return (
    <FormItem>
      <strong className={`${prefix}--file--label`}>Account photo</strong>
      <p className={`${prefix}--label-description`}>
        Only .jpg and .png files. 500kb max file size
      </p>
      <FileUploaderDropContainer {...props} onAddFiles={onAddFiles} />
      <div className={`${prefix}--file-container`}>
        {files.map(
          ({ uuid, name, size, status, iconDescription, invalid, ...rest }) => (
            <FileUploaderItem
              key={uid()}
              uuid={uuid}
              name={name}
              size={size}
              status={status}
              iconDescription={iconDescription}
              invalid={invalid}
              onDelete={handleFileUploaderItemClick}
              {...rest}
            />
          )
        )}
      </div>
    </FormItem>
  );
}

export default props => <ExampleDropContainerApp {...props} />;
