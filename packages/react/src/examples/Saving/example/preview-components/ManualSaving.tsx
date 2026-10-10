/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Layer } from '@carbon/react';
import { Saving } from '../components/Saving';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ManualSaving = () => {
  const [status, setStatus] = useState<
    'default' | 'in-progress' | 'success' | 'fail'
  >('default');

  const onSaveHandler = async () => {
    setStatus('in-progress');
    await wait(2000);
    setStatus('success');
  };

  return (
    // <Layer>
      <main>
        <Saving
          type="manual"
          status={status}
          defaultText="Save"
          inProgressText="Saving..."
          successText="Saved"
          failText="Failed to save. Try again?"
          defaultIconDescription="Save icon"
          inProgressIconDescription="Saving in progress"
          successIconDescription="Saved successfully"
          failIconDescription="Save failed"
          secondaryButtonText="Cancel"
          onRequestSave={onSaveHandler}
          onRequestCancel={() => setStatus('default')}
        />
      </main>
    // </Layer>
  );
};
