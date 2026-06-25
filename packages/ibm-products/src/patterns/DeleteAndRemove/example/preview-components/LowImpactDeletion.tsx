/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, InlineLoading, ToastNotification } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import { getCurrentTime } from '../components/utils';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LowImpactDeletion = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    await wait(1000);
    return true;
  };

  const handleDelete = async () => {
    setLoading(true);
    const isDelete = await deleteItem();
    setLoading(false);
    isDelete && showNotification();
  };

  const showNotification = () => {
    setOpen(true);
  };

  const hideNotification = () => {
    setOpen(false);
  };

  return (
    <div className="app">
      {loading ? (
        <Button
          size="md"
          kind="danger"
          iconDescription="Loading"
          renderIcon={InlineLoading}
        >
          Deleting...
        </Button>
      ) : (
        <Button
          size="md"
          kind="danger"
          iconDescription="TrashCan"
          renderIcon={TrashCan}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      {open && (
        <ToastNotification
          aria-label="closes notification"
          caption={getCurrentTime()}
          kind="success"
          lowContrast
          onClose={hideNotification}
          role="status"
          statusIconDescription="notification"
          subtitle="Bx1001 has been successfully deleted."
          timeout={3000}
          title="Success"
          className="notification"
        />
      )}
    </div>
  );
};
