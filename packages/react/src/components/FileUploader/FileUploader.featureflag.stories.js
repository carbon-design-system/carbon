/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import { FileUploader } from '../FileUploader';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

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
  const handleChange = (event, data) => {
    logEventData(event);
  };

  const handleDelete = (event, data) => {
    logDeleteData(event);
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
        onChange={handleChange}
        onDelete={handleDelete}
        iconDescription="Remove uploaded file"
        {...args}
      />
    </div>
  );
};

EnhancedCallbacks.args = {
  disabled: false,
};

EnhancedCallbacks.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ControlledFileState = (args) => {
  const fileUploaderRef = useRef(null);

  useEffect(() => {
    if (!fileUploaderRef.current) return;
    const currentFiles = fileUploaderRef.current.getCurrentFiles();
    if (!currentFiles?.length) return;

    const mutatedFiles = currentFiles.map((file, index) => ({
      ...file,
      disabled: args.disabled,
    }));

    fileUploaderRef.current.setCurrentFiles(mutatedFiles);
  }, [args.disabled]);

  const handleChange = (event, data) => {
    logEventData(event);
  };

  const handleDelete = (event, data) => {
    logDeleteData(event);
  };

  return (
    <div>
      <FileUploader
        ref={fileUploaderRef}
        labelTitle="Enhanced FileUploader Demo"
        labelDescription="Open browser console to see detailed callback data when adding/removing files"
        buttonLabel="Add file(s)"
        buttonKind="primary"
        filenameStatus="edit"
        multiple
        onChange={handleChange}
        onDelete={handleDelete}
        iconDescription="Remove uploaded file"
        {...args}
      />
    </div>
  );
};

ControlledFileState.args = {
  disabled: false,
};

ControlledFileState.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};
