/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, Checkbox, FormLabel, Link } from '@carbon/react';
import { Launch } from '@carbon/react/icons';
import { DeleteAndRemove } from '../components/DeleteAndRemove';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const batchItems = [
  { id: 1, name: 'Route1_name' },
  { id: 2, name: 'Hpt-392-ser' },
  { id: 3, name: 'Route2_name' },
];

const protectedItems = [
  { id: 1, name: 'Route3_name' },
  { id: 2, name: 'Route4_name' },
];

export const HighImpactBatchDeletion = () => {
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    'inactive' | 'active' | 'finished' | 'error'
  >('inactive');
  const [loaderDescription, setLoaderDescription] = useState('Deleting');
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
          setIsChecked(false);
          setOpen(true);
        }}
      >
        Delete all
      </Button>
      <DeleteAndRemove
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={handleDelete}
        modalHeading="Confirm delete"
        modalLabel="Delete selected items"
        primaryButtonDisabled={!isChecked}
        size="sm"
        loadingStatus={loadingStatus}
        loadingDescription={loaderDescription}
        onLoadingSuccess={resetLoaderStatus}
        showSuccessNotification={true}
        successNotificationSubtitle="Selected items have been successfully deleted."
      >
        <p style={{ marginBottom: '1rem' }}>
          Decide if you want to keep these items. Deleting these items is
          permanent. This action cannot be undone.
        </p>
        <FormLabel>
          The following items will be deleted. Review each item to confirm that
          they can be deleted.
        </FormLabel>
        <Checkbox
          checked={isChecked}
          id="checkbox-1"
          labelText={`${batchItems.length} items: `}
          onChange={(event, { checked }) => setIsChecked(checked)}
        />
        <ul className="no-bullets">
          {batchItems.map((item) => (
            <li key={item.id}>
              <Link href="#" renderIcon={Launch}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {protectedItems.length > 0 && (
          <p style={{ marginTop: '1rem' }}>
            Note - the following selected items cannot be deleted:{' '}
            {protectedItems.map((item, index) => (
              <span key={item.id}>
                <Link href="#" renderIcon={Launch}>
                  {item.name}
                </Link>
                {index < protectedItems.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}
      </DeleteAndRemove>
    </div>
  );
};
