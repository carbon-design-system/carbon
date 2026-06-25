/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { DeleteAndRemove } from '../components/DeleteAndRemove';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MediumImpactDeletion = () => {
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    'inactive' | 'active' | 'finished' | 'error'
  >('inactive');
  const [loaderDescription, setLoaderDescription] = useState('Deleting');

  const deleteItem = async () => {
    await wait(1000);
    return true;
  };

  const handleDelete = async () => {
    setLoadingStatus('active');
    await deleteItem();
    setLoadingStatus('finished');
    setLoaderDescription('Deleted!');
    setOpen(false);
  };

  const resetLoaderStatus = () => {
    setLoadingStatus('inactive');
    setLoaderDescription('Deleting...');
  };

  return (
    <div className="app">
      <Button size="md" kind="danger" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <DeleteAndRemove
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={handleDelete}
        modalHeading="Confirm delete"
        modalLabel="Delete Bx1001"
        loadingStatus={loadingStatus}
        loadingDescription={loaderDescription}
        onLoadingSuccess={resetLoaderStatus}
        showSuccessNotification={true}
        successNotificationSubtitle="Bx1001 has been successfully deleted."
      >
        <p>
          When you delete 'Bx1001', this resource is permanently deleted. This
          action cannot be undone.
        </p>
      </DeleteAndRemove>
    </div>
  );
};
