/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, TextInput } from '@carbon/react';
import { DeleteAndRemove } from '../components/DeleteAndRemove';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const HighImpactDeletion = () => {
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    'inactive' | 'active' | 'finished' | 'error'
  >('inactive');
  const [loaderDescription, setLoaderDescription] = useState('Deleting');
  const [resourceName, setResourceName] = useState('');
  const [isValidName, setIsValidName] = useState(false);

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

  const validateInput = (evt) => {
    setResourceName(evt.target.value);
    setIsValidName(evt.target.value === 'Bx1001');
  };

  const resetLoaderStatus = () => {
    setLoadingStatus('inactive');
    setLoaderDescription('Deleting...');
  };

  return (
    <div className="app">
      <Button
        size="md"
        kind="danger"
        onClick={() => {
          setResourceName('');
          setOpen(true);
        }}
      >
        Delete
      </Button>
      <DeleteAndRemove
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={handleDelete}
        modalHeading="Confirm delete"
        modalLabel="Delete Bx1001"
        primaryButtonDisabled={!isValidName}
        loadingStatus={loadingStatus}
        loadingDescription={loaderDescription}
        onLoadingSuccess={resetLoaderStatus}
        showSuccessNotification={true}
        successNotificationSubtitle="Bx1001 has been successfully deleted."
      >
        <p style={{ marginBottom: '1rem' }}>
          Deleting 'Bx1001' will permanently delete the configuration. This
          action cannot be undone.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Type Bx1001 to confirm"
          placeholder="Name of resource"
          value={resourceName}
          onChange={validateInput}
        />
      </DeleteAndRemove>
    </div>
  );
};
