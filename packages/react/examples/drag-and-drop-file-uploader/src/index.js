/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { settings } from 'carbon-components';
import {
  FileUploaderItem,
  FileUploaderDropContainer,
  FormItem,
} from 'carbon-components-react';

let lastId = 0;

function uid(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}
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
    try {
      const response = await fetch(
        'https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1000ms',
        {
          method: 'POST',
          mode: 'cors',
          body: fileToUpload,
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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

      // show x icon after 1 second
      setTimeout(() => {
        const updatedFile = {
          ...fileToUpload,
          status: 'edit',
          iconDescription: 'Remove file',
        };
        setFiles(files =>
          files.map(file =>
            file.uuid === fileToUpload.uuid ? updatedFile : file
          )
        );
      }, 1000);
    } catch (error) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Upload failed',
        invalid: true,
      };
      setFiles(files =>
        files.map(file => (file === fileToUpload ? updatedFile : file))
      );
      console.log(error);
    }
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
      <div className="uploaded-files" style={{ width: '100%' }}>
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

render(
  <ExampleDropContainerApp accept={['image/jpeg', 'image/png']} />,
  document.getElementById('root')
);
