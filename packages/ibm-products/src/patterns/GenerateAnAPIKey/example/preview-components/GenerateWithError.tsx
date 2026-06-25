/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, PasswordInput, InlineLoading } from '@carbon/react';
import { GenerateAnAPIKey } from '../components/GenerateAnAPIKey';
import { APIKeyDownloader } from '../../../../components/APIKeyModal/APIKeyDownloader';
import {
  InformationFilled,
  CheckmarkFilled,
  ErrorFilled,
} from '@carbon/react/icons';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiCall = async () => {
  await wait(1000);
  throw new Error('Failed to generate API key');
};

export const GenerateWithError = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const blockClass = `apikey-modal-pattern`;

  useEffect(() => {
    if (open && key && passwordInputRef.current) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 0);
    }
  }, [open, key]);

  useEffect(() => {
    if (open && error && textInputRef.current) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 0);
    }
  }, [open, error]);

  const handleName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
    if (error) {
      setError(false);
    }
  };

  const fetchKey = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await apiCall();
      setKey(data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(key);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModal = () => {
    if (open) {
      setKey('');
      setName('');
      setLoading(false);
      setError(false);
    }
    setOpen(!open);
  };

  const getLoadingStatus = (): 'inactive' | 'active' | 'finished' => {
    if (key) return 'finished';
    if (loading) return 'active';
    return 'inactive';
  };

  const modalProps = key
    ? {
        modalHeading: 'Generate an API key',
        primaryButtonText: 'Copy',
        onRequestSubmit: copyKey,
        loadingStatus: 'inactive' as const,
        apiKeyLoaded: true,
        apiKey: key,
        copyIconDescription: 'Copy',
        onCopy: copyKey,
      }
    : {
        modalHeading: 'Generate an API key',
        primaryButtonText: 'Generate API key',
        onRequestSubmit: fetchKey,
        loadingStatus: getLoadingStatus(),
        apiKeyLoaded: false,
      };

  return (
    <div className="app">
      <Button onClick={toggleModal}>Generate API Key</Button>
      <GenerateAnAPIKey
        open={open}
        onRequestClose={toggleModal}
        primaryButtonDisabled={loading || name.length === 0}
        secondaryButtonText="Close"
        loadingDescription="Generating..."
        onLoadingSuccess={() => {}}
        modalLabel="An example of Generate API key"
        {...modalProps}
      >
        {key ? (
          <>
            <PasswordInput
              id="generated-api-key-error"
              labelText="Unique API key"
              value={key}
              readOnly
              showPasswordLabel="Show key"
              hidePasswordLabel="Hide key"
              tooltipPosition="left"
              helperText="This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it."
              ref={passwordInputRef}
            />
            <div className={`${blockClass}__messaging`}>
              {/* @ts-ignore */}
              <InformationFilled size={16} />
              <APIKeyDownloader
                apiKey={key}
                body="This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it."
                fileName="apikey"
                linkText="Download as JSON"
                fileType="json"
                downloadLinkLabel="Download API Key in Java Script File format"
              />
            </div>
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
                API key successfully created
              </p>
            </div>
          </>
        ) : (
          <>
            <p style={{ marginBlockEnd: '1rem' }}>
              (Optional description text) To connect securely to [product name],
              your application or tool needs an API key with permission to
              access resources such as [product resource name].
            </p>
            <TextInput
              id="app-name-error"
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
                description="Generating..."
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
                  Failed to generate API key
                </p>
              </div>
            )}
          </>
        )}
      </GenerateAnAPIKey>
    </div>
  );
};
