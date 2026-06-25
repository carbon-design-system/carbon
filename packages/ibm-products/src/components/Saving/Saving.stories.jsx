/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { Saving } from '.';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import wait from '../../global/js/utils/wait';
import { TextArea } from '@carbon/react';
import mdx from './Saving.mdx';

export default {
  title: 'Patterns/Prebuilt patterns/Saving',
  component: Saving,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    successful: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const defaultProps = {
  className: 'saving-story',
  defaultText: 'Save',
  failText: 'Failed to save',
  inProgressText: 'Saving...',
  successful: true,
  successText: 'Saved',
};

const AutoTemplate = (args) => {
  const { successful, ...rest } = args;
  const [status, setStatus] = useState('default');
  const [text, setText] = useState('');
  const [dirtyInput, setDirtyInput] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (dirtyInput) {
        setStatus('in-progress');
        await wait(1000);
        setStatus(successful ? 'success' : 'fail');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [text, successful, dirtyInput]);

  const onChangeHandler = async (evt) => {
    const { value } = evt.target;
    if (!dirtyInput) {
      setDirtyInput(true);
    }
    setText(value);
  };

  return (
    <main>
      <TextArea
        id="save-auto-textarea"
        onChange={onChangeHandler}
        value={text}
        labelText="Enter in the thing you wanted saved"
        className="saving-story-textarea"
      />
      {dirtyInput && status !== 'default' && (
        <Saving {...rest} status={status} />
      )}
    </main>
  );
};

const ManualTemplate = (args) => {
  const { successful, ...rest } = args;
  const [status, setStatus] = useState('default');

  const onSaveHandler = async () => {
    setStatus('in-progress');
    await wait(2000);
    setStatus(successful ? 'success' : 'fail');
  };

  return (
    <main>
      <Saving {...rest} onRequestSave={onSaveHandler} status={status} />
    </main>
  );
};

export const Auto = AutoTemplate.bind({});
Auto.args = {
  ...defaultProps,
  type: 'auto',
};

export const Manual = ManualTemplate.bind({});
Manual.args = {
  ...defaultProps,
  type: 'manual',
  failText: 'Failed to save. Try again?',
  secondaryButtonText: 'Cancel',
};
