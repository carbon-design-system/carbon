/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, Checkbox, FormLabel, Link, TextInput } from '@carbon/react';
import { Launch } from '@carbon/react/icons';
import { DeleteAndRemove } from '../components/DeleteAndRemove';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectedItems = [
  { id: 1, name: 'Route1_name' },
  { id: 2, name: 'Hpt-392-ser' },
  { id: 3, name: 'Route2_name' },
];

export const HighImpactDeletionWithConnectedItems = () => {
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    'inactive' | 'active' | 'finished' | 'error'
  >('inactive');
  const [loaderDescription, setLoaderDescription] = useState('Deleting');
  const [resourceName, setResourceName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
          setIsChecked(false);
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
        primaryButtonDisabled={!isValidName || !isChecked}
        loadingStatus={loadingStatus}
        loadingDescription={loaderDescription}
        onLoadingSuccess={resetLoaderStatus}
        showSuccessNotification={true}
        successNotificationSubtitle="Bx1001 and all connected items have been successfully deleted."
      >
        <p style={{ marginBottom: '1rem' }}>
          When you delete the 'Bx1001', this resource and all connected items
          are permanently deleted. This action cannot be undone.
        </p>
        <TextInput
          data-modal-primary-focus
          value={resourceName}
          id="text-input-1"
          labelText="Type Bx1001 to confirm"
          placeholder="Name of resource"
          onChange={validateInput}
          style={{ marginBottom: '1rem' }}
        />
        <FormLabel>
          The following connected items will also be deleted. Review each item
          to confirm that they can be deleted.
        </FormLabel>
        <Checkbox
          checked={isChecked}
          id="checkbox-1"
          labelText={`${connectedItems.length} items: `}
          onChange={(event, { checked }) => setIsChecked(checked)}
        />
        <ul className="no-bullets">
          {connectedItems.map((item) => (
            <li key={item.id}>
              <Link href="#" renderIcon={Launch}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </DeleteAndRemove>
    </div>
  );
};
