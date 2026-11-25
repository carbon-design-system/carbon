/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
} from '@carbon/react';
import { ExportModal } from '../components/ExportModal';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const preformattedExtensions = [
  {
    extension: 'YAML',
    description: 'best for IBM managed cloud',
  },
  {
    extension: 'BAR',
    description: 'best for integration server',
  },
];

export const ExportModalWithPreformattedExtensions = () => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const [extension, setExtension] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setExtension(preformattedExtensions[0].extension);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const primaryButtonDisabled = loading;

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
          <FormGroup legendText="Choose an export format">
            <RadioButtonGroup
              orientation="vertical"
              onChange={(value) => setExtension(value)}
              valueSelected={extension}
              name="extensions"
              aria-label="extensions"
            >
              {preformattedExtensions.map((o) => (
                <RadioButton
                  key={o.extension}
                  id={o.extension}
                  value={o.extension}
                  labelText={`${o.extension} (${o.description})`}
                  data-modal-primary-focus
                />
              ))}
            </RadioButtonGroup>
          </FormGroup>
        </ExportModal>
      )}
    </>
  );
};
