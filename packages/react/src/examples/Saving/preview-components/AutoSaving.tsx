/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { Layer, TextArea } from '@carbon/react';
import { Saving } from '../components/Saving';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AutoSaving = () => {
  const [status, setStatus] = useState<
    'default' | 'in-progress' | 'success' | 'fail'
  >('default');
  const [text, setText] = useState('');
  const [dirtyInput, setDirtyInput] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (dirtyInput) {
        setStatus('in-progress');
        await wait(1000);
        setStatus('success');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [text, dirtyInput]);

  const onChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    if (!dirtyInput) {
      setDirtyInput(true);
    }
    setText(value);
  };

  return (
    // <Layer>
      <main>
        <TextArea
          id="save-auto-textarea"
          onChange={onChangeHandler}
          value={text}
          labelText="Enter in the thing you wanted saved"
          className="saving-story-textarea"
        />
        {dirtyInput && status !== 'default' && (
          <Saving
            type="auto"
            status={status}
            inProgressText="Saving..."
            successText="Saved"
            failText="Failed to save"
          />
        )}
      </main>
    // </Layer>
  );
};
