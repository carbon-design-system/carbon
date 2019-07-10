import React, { useState, useCallback } from 'react';
import { settings } from 'carbon-components';
import fetchMock from 'fetch-mock/src/client.js';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import uid from '../../../tools/uniqueId';

const { prefix } = settings;

fetchMock.mock({
  method: 'POST',
  matcher: '*',
  overwriteRoutes: false,
  response: () =>
    new Promise((resolve, reject) =>
      setTimeout(
        () => (Math.round(Math.random()) ? resolve('200') : reject(503)),
        Math.random() * 1000
      )
    ),
});

function ExampleDropContainerApp({ errorSubject, errorBody, ...props }) {
  const [files, setFiles] = useState([]);
  const uploadFile = async fileToUpload => {
    try {
      await fetch('https://ibm.com/', {
        method: 'POST',
        body: fileToUpload,
      });
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
      console.log(error); // eslint-disable-line no-console
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
        Only .jpg and .png files. 500kb max file size.
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
              errorSubject={errorSubject}
              errorBody={errorBody}
              {...rest}
            />
          )
        )}
      </div>
    </FormItem>
  );
}

export default props => <ExampleDropContainerApp {...props} />;
