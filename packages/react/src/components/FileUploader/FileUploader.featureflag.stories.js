/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import { FileUploader } from '../FileUploader';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

const defaultArgs = {
  accept: ['.jpg', '.png'],
  buttonKind: 'primary',
  buttonLabel: 'Add file(s)',
  disabled: false,
  filenameStatus: 'edit',
  iconDescription: 'Remove uploaded file',
  labelDescription:
    'Open browser console to see detailed callback data when adding/removing files',
  labelTitle: 'Enhanced FileUploader Demo',
  maxFileSize: 1024 * 1024,
  multiple: true,
  name: '',
  size: 'md',
};

const argTypes = {
  accept: { control: 'object' },
  buttonKind: {
    control: 'select',
    options: [
      'primary',
      'secondary',
      'danger',
      'ghost',
      'danger--primary',
      'tertiary',
    ],
  },
  buttonLabel: { control: 'text' },
  disabled: { control: 'boolean' },
  filenameStatus: {
    control: 'select',
    options: ['edit', 'complete', 'uploading'],
  },
  iconDescription: { control: 'text' },
  labelDescription: { control: 'text' },
  labelTitle: { control: 'text' },
  maxFileSize: { control: { type: 'number', min: 0, step: 1 } },
  multiple: { control: 'boolean' },
  name: { control: 'text' },
  onAddFiles: { action: 'onAddFiles' },
  onChange: { action: 'onChange' },
  onClick: { action: 'onClick' },
  onDelete: { action: 'onDelete' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
};

export default {
  title: 'Components/FileUploader/Feature Flag',
  component: FileUploader,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-enhanced-file-uploader': true,
        }}>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

// const DEBUG_ENABLED = process.env.NODE_ENV !== 'production';
const DEBUG_ENABLED = true;

const debugLog = (...args) => {
  if (DEBUG_ENABLED) {
    console.log(...args);
  }
};

const mapFileList = (files) =>
  files?.map((f) => ({ name: f.name, uuid: f.uuid })) || [];

const logFileList = (label, files) => {
  if (Array.isArray(files)) {
    debugLog(label, mapFileList(files));
  } else if (files) {
    debugLog(label, { name: files.name, uuid: files.uuid });
  }
};

const logEventData = (event) => {
  debugLog('  Action:', event.target.action);

  logFileList('  Added Files:', event.target.addedFiles);
  logFileList('  Deleted File:', event.target.deletedFile);
  logFileList('  Cleared Files:', event.target.clearedFiles);
  logFileList('  Current Files:', event.target.currentFiles);
};

const logDeleteData = (event) => {
  debugLog('  Deleted File Object:', event.target.deletedFile);
  debugLog('  Deleted File Name:', event.target.deletedFile?.name);
  logFileList('  Remaining Files:', event.target.remainingFiles);
};

export const EnhancedCallbacks = (args) => {
  const { onChange, onDelete, ...rest } = args;
  const handleChange = (event, data) => {
    logEventData(event);
    onChange?.(event, data);
  };

  const handleDelete = (event, data) => {
    logDeleteData(event);
    onDelete?.(event, data);
  };

  return (
    <div>
      <FileUploader
        labelTitle="Enhanced FileUploader Demo"
        labelDescription="Open browser console to see detailed callback data when adding/removing files"
        buttonLabel="Add file(s)"
        buttonKind="primary"
        filenameStatus="edit"
        multiple={true}
        iconDescription="Remove uploaded file"
        {...rest}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

EnhancedCallbacks.args = {
  ...defaultArgs,
};

EnhancedCallbacks.argTypes = { ...argTypes };

export const ControlledFileState = (args) => {
  const { disabled, onChange, onDelete, ...rest } = args;
  const fileUploaderRef = useRef(null);

  useEffect(() => {
    if (!fileUploaderRef.current) return;
    const currentFiles = fileUploaderRef.current.getCurrentFiles();
    if (!currentFiles?.length) return;

    const mutatedFiles = currentFiles.map((file) => ({
      ...file,
      disabled,
    }));

    fileUploaderRef.current.setCurrentFiles(mutatedFiles);
  }, [disabled]);

  const handleChange = (event, data) => {
    logEventData(event);
    onChange?.(event, data);
  };

  const handleDelete = (event, data) => {
    logDeleteData(event);
    onDelete?.(event, data);
  };

  return (
    <div>
      <FileUploader
        ref={fileUploaderRef}
        accept={['.jpg', '.png']}
        labelTitle="Enhanced FileUploader Demo"
        buttonLabel="Add file(s)"
        buttonKind="primary"
        filenameStatus="edit"
        multiple
        iconDescription="Remove uploaded file"
        {...rest}
        disabled={disabled}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

ControlledFileState.args = {
  ...defaultArgs,
  labelDescription:
    'Add files, then toggle the disabled state and notice that the state is passed to the items.',
};

ControlledFileState.argTypes = { ...argTypes };
