/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { delay } from 'bluebird';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXFileUploader from 'carbon-web-components/es/components-react/file-uploader/file-uploader';
// @ts-ignore
import BXFileDropContainer from 'carbon-web-components/es/components-react/file-uploader/drop-container';
import BXFileUploaderItem, {
  FILE_UPLOADER_ITEM_STATE,
  // @ts-ignore
} from 'carbon-web-components/es/components-react/file-uploader/file-uploader-item';
import { FileData } from './stories/types';
import { Default as baseDefault } from './file-uploader-story';

export { default } from './file-uploader-story';

const BXCEDemoFileUploader = ({ accept, disabled, helperText, labelText, multiple, size }) => {
  const [files, setFilesState] = useState<FileData[]>([]);
  const filesRef = useRef(files);

  const setFiles = (newFiles: FileData[]) => {
    filesRef.current = newFiles; // Keeps the new files in a ref so an async call can refer to the latest one
    setFilesState(newFiles);
  };

  const simulateUpload = useCallback(
    async (data: FileData) => {
      const { id, file } = data;
      if (file.size > 524288) {
        const { current: currentFiles } = filesRef;
        setFiles(
          currentFiles.map(item =>
            id !== item.id
              ? item
              : {
                  ...item,
                  state: FILE_UPLOADER_ITEM_STATE.EDITING,
                  invalid: true,
                  validityMessage: 'File size exceeds limit',
                  supplementalValidityMessage: '500kb max file size. Select a new file and try again.',
                }
          )
        );
      } else {
        // Simulates network request time
        const rand = Math.random() * 1000;
        await delay(rand);
        const { current: currentFiles } = filesRef;
        setFiles(
          currentFiles.map(item =>
            id !== item.id
              ? item
              : {
                  ...item,
                  state: FILE_UPLOADER_ITEM_STATE.UPLOADED,
                }
          )
        );
        // Shows x icon after 1 second
        await delay(1000);
        const { current: updatedFiles } = filesRef;
        setFiles(
          updatedFiles.map(item =>
            id !== item.id
              ? item
              : {
                  ...item,
                  state: FILE_UPLOADER_ITEM_STATE.EDITING,
                }
          )
        );
      }
    },
    [setFiles]
  );

  const handleChange = useCallback(
    (event: CustomEvent) => {
      const { addedFiles } = event.detail;
      const newFiles: FileData[] = addedFiles.map(
        item =>
          ({
            id: Math.random().toString(36).slice(2),
            file: item,
            state: FILE_UPLOADER_ITEM_STATE.UPLOADING,
          } as FileData)
      );
      if (multiple) {
        setFiles(files.concat(newFiles));
        newFiles.forEach(simulateUpload);
      } else if (addedFiles.length > 0) {
        setFiles(files.concat(newFiles[0]));
        simulateUpload(newFiles[0]);
      }
    },
    [files, multiple, setFiles]
  );

  const handleDelete = useCallback(
    (event: CustomEvent) => {
      const { fileId: idToDelete } = (event.target as HTMLElement).dataset;
      setFiles(files.filter(({ id }) => idToDelete !== id));
    },
    [files, setFiles]
  );

  return (
    <BXFileUploader helperText={helperText} labelText={labelText}>
      <BXFileDropContainer accept={accept} disabled={disabled} multiple={multiple} onChange={handleChange}>
        Drag and drop files here or click to upload
      </BXFileDropContainer>
      {files.map(({ id, invalid, file, state, supplementalValidityMessage, validityMessage }) => (
        <BXFileUploaderItem
          key={id}
          data-file-id={id}
          invalid={invalid}
          size={size}
          state={state}
          validityMessage={validityMessage}
          onDelete={handleDelete}>
          {file.name}
          <span slot="validity-message-supplement">{supplementalValidityMessage}</span>
        </BXFileUploaderItem>
      ))}
    </BXFileUploader>
  );
};

BXCEDemoFileUploader.propTypes = {
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  labelText: PropTypes.string,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'field']),
  onBeforeDelete: PropTypes.func,
  onAfterDelete: PropTypes.func,
};

export const Default = args => {
  const { helperText, labelText } = args?.['bx-file-uploader-shell'] ?? {};
  const { accept, disabled, multiple } = args?.['bx-file-drop-container'] ?? {};
  const { size, disableDelete, onBeforeDelete, onDelete } = args?.['bx-file-uploader-item'] ?? {};
  const handleBeforeDelete = (event: CustomEvent) => {
    onBeforeDelete(event);
    if (disableDelete) {
      event.preventDefault();
    }
  };
  return (
    <BXCEDemoFileUploader
      accept={accept}
      disabled={disabled}
      helperText={helperText}
      labelText={labelText}
      multiple={multiple}
      size={size}
      onBeforeDelete={handleBeforeDelete}
      onAfterDelete={onDelete}></BXCEDemoFileUploader>
  );
};

Object.assign(Default, baseDefault);
