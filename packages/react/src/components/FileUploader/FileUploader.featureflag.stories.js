/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
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

export const EnhancedCallbacks = (args) => {
  const handleChange = (event, data) => {
    console.log('  Action:', event.target.action);

    if (event.target.addedFiles) {
      console.log(
        '  Added Files:',
        event.target.addedFiles.map((f) => ({ name: f.name, uuid: f.uuid }))
      );
    }

    if (event.target.deletedFile) {
      console.log('  Deleted File:', {
        name: event.target.deletedFile.name,
        uuid: event.target.deletedFile.uuid,
      });
    }

    if (event.target.clearedFiles) {
      console.log(
        '  Cleared Files:',
        event.target.clearedFiles.map((f) => ({ name: f.name, uuid: f.uuid }))
      );
    }

    console.log(
      '  Current Files:',
      event.target.currentFiles?.map((f) => ({ name: f.name, uuid: f.uuid })) ||
        []
    );
  };

  const handleDelete = (event, data) => {
    console.log('  Deleted File Object:', event.target.deletedFile);
    console.log('  Deleted File Name:', event.target.deletedFile?.name);
    console.log(
      '  Remaining Files:',
      event.target.remainingFiles?.map((f) => ({
        name: f.name,
        uuid: f.uuid,
      })) || []
    );
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
