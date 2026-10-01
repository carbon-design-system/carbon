/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, PasswordInput, InlineLoading } from '@carbon/react';
import { GenerateAnAPIKey } from '../components/GenerateAnAPIKey';
import { APIKeyDownloader } from '../components/APIKeyDownloader';
import { InformationFilled, CheckmarkFilled } from '@carbon/react/icons';
import '../index.scss';
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiCall = async () => {
  await wait(1000);
  return '082be29c-3622-4276-bc58-695e2a12bd93';
};

export const Generate = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const blockClass = `apikey-modal-pattern`;

  useEffect(() => {
    if (open && key && passwordInputRef.current) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 0);
    }
  }, [open, key]);

  const handleName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const fetchKey = async () => {
    setLoading(true);
    const data = await apiCall();
    setLoading(false);
    setKey(data);
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
        modalLabel: 'An example of Generate API key',
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
        modalLabel: 'An example of Generate API key',
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
        loadingDescription="Loading"
        onLoadingSuccess={() => {}}
        {...modalProps}
      >
        <p style={{ marginBlockEnd: '1rem' }}>
          (Optional description text) To connect securely to [product name],
          your application or tool needs an API key with permission to access
          resources such as [product resource name].
        </p>
        {key ? (
          <>
            <PasswordInput
              id="generated-api-key"
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
                fileName="apikey"
                linkText="Download as JSON"
                fileType="json"
                downloadLinkLabel="Download API Key in Java Script File format"
              />
            </div>
            <div className={`${blockClass}__messaging`}>
              {/* @ts-ignore */}
              <CheckmarkFilled
                size={16}
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
            <TextInput
              id="app-name"
              labelText="Name your application"
              placeholder="Application name"
              value={name}
              onChange={handleName}
              disabled={loading}
              helperText="Providing the application name will help you identify your API key later."
              data-modal-primary-focus
            />
            {loading && (
              <InlineLoading
                description="Generating..."
                className={`${blockClass}__loader`}
              />
            )}
          </>
        )}
      </GenerateAnAPIKey>
    </div>
  );
};
