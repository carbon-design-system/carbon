/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, InlineLoading } from '@carbon/react';
import { GenerateAnAPIKey } from '../components/GenerateAnAPIKey';
import { CheckmarkFilled, ErrorFilled } from '@carbon/react/icons';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiCall = async () => {
  await wait(1000);
  throw new Error('Failed to edit API key');
};

export const EditWithError = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('test_key_1');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);
  const blockClass = `apikey-modal-pattern`;

  useEffect(() => {
    if (open && (success || error) && textInputRef.current) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 0);
    }
  }, [open, success, error]);

  const handleName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (success) {
      setSuccess(false);
    }
    if (error) {
      setError(false);
    }
    setName(evt.target.value);
  };

  const submitHandler = async () => {
    setSuccess(false);
    setError(false);
    setLoading(true);
    try {
      await apiCall();
      setSuccess(true);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  const toggleModal = () => {
    if (open) {
      setName('test_key_1');
      setSuccess(false);
      setError(false);
      setLoading(false);
    }
    setOpen(!open);
  };

  const getLoadingStatus = (): 'inactive' | 'active' | 'finished' => {
    if (success) return 'finished';
    if (loading) return 'active';
    return 'inactive';
  };

  return (
    <div className="app">
      <Button onClick={toggleModal}>Edit API key</Button>
      <GenerateAnAPIKey
        open={open}
        onRequestClose={toggleModal}
        onRequestSubmit={submitHandler}
        modalHeading="Save an API key"
        modalLabel="An example of Generate API key"
        primaryButtonText="Save API key"
        secondaryButtonText="Close"
        primaryButtonDisabled={loading || name.length === 0}
        loadingStatus={getLoadingStatus()}
        loadingDescription={loading ? 'Saving...' : ''}
        onLoadingSuccess={() => {}}
      >
        <p style={{ marginBlockEnd: '1rem' }}>
          (Optional description text) To connect securely to [product name],
          your application or tool needs an API key with permission to access
          resources such as [product resource name].
        </p>
        <TextInput
          id="edit-app-name-error"
          labelText="Name your application"
          placeholder="Application name"
          value={name}
          onChange={handleName}
          disabled={loading}
          helperText="Providing the application name will help you identify your API key later."
          data-modal-primary-focus
          ref={textInputRef}
        />
        {loading && (
          <InlineLoading
            description="Saving..."
            className={`${blockClass}__loader`}
          />
        )}
        {error && (
          <div className={`${blockClass}__messaging`}>
            <div className={`${blockClass}__error-icon`}>
              {/* @ts-ignore */}
              <ErrorFilled size={16} />
            </div>
            <p
              className={`${blockClass}__messaging-text`}
              role="alert"
              aria-live="assertive"
            >
              Failed to edit API key
            </p>
          </div>
        )}
        {success && (
          <div className={`${blockClass}__messaging`}>
            {/* @ts-ignore */}
            <CheckmarkFilled
              size={20}
              className={`${blockClass}__checkmark-icon`}
            />
            <p
              className={`${blockClass}__messaging-text`}
              role="alert"
              aria-live="assertive"
            >
              API key successfully saved
            </p>
          </div>
        )}
      </GenerateAnAPIKey>
    </div>
  );
};
