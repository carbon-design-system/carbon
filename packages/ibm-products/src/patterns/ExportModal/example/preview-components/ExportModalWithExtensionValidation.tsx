/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, TextInput } from '@carbon/react';
import { ExportModal } from '../components/ExportModal';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const blockClass = 'export-modal';

export const ExportModalWithExtensionValidation = () => {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('Sample02.pdf');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const onCloseHandler = () => {
    setOpen(false);
    setSuccessful(false);
    setError(false);
  };

  const onSubmitHandler = async () => {
    setLoading(true);
    await wait(1000);
    setSuccessful(true);
    setLoading(false);
  };

  const hasInvalidExtension = () => {
    const validExtensions = ['pdf'];
    if (!validExtensions || !validExtensions.length) {
      return false;
    }
    if (!name.includes('.')) {
      return true;
    }
    const ext = name.split('.').pop();
    if (!ext || !validExtensions.includes(ext)) {
      return true;
    }
    return false;
  };

  const primaryButtonDisabled = loading || !name || hasInvalidExtension();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      {isOpen && (
        <ExportModal
          open={isOpen}
          onClose={onCloseHandler}
          onSubmit={onSubmitHandler}
          loading={loading}
          successful={successful}
          error={error}
          primaryButtonDisabled={primaryButtonDisabled}
        >
          <p className={`${blockClass}__body`}>
            File must be exported in a PDF format.
          </p>
          <TextInput
            id="export-file-name-validation"
            labelText="File name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            invalid={hasInvalidExtension()}
            invalidText="File must have valid extension .pdf"
          />
        </ExportModal>
      )}
    </>
  );
};
