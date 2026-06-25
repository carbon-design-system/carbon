/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button, PasswordInput, InlineLoading } from '@carbon/react';
import { GenerateAnAPIKey } from '../components/GenerateAnAPIKey';
import { APIKeyDownloader } from '../../../../components/APIKeyModal/APIKeyDownloader';
import { InformationFilled, CheckmarkFilled } from '@carbon/react/icons';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiCall = async () => {
  await wait(1000);
  return '082be29c-3622-4276-bc58-695e2a12bd93';
};

export const InstantGenerate = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const blockClass = `apikey-modal-pattern`;

  const generateKey = async () => {
    setLoading(true);
    const data = await apiCall();
    setKey(data);
    setLoading(false);
    setOpen(true);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(key);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="app">
      {loading ? (
        <Button renderIcon={InlineLoading}>Generating...</Button>
      ) : (
        <Button onClick={generateKey}>Generate</Button>
      )}
      <GenerateAnAPIKey
        open={open}
        onRequestClose={toggleModal}
        onRequestSubmit={copyKey}
        modalHeading="Generate an API key"
        modalLabel="An example of Generate API key"
        primaryButtonText="Copy"
        secondaryButtonText="Close"
        apiKeyLoaded={true}
        apiKey={key}
        copyIconDescription="Copy"
        onCopy={copyKey}
      >
        <PasswordInput
          id="instant-api-key"
          labelText="Unique API Key"
          value={key}
          readOnly
          showPasswordLabel="Show key"
          hidePasswordLabel="Hide key"
          tooltipPosition="left"
          helperText="This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it."
          data-modal-primary-focus
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
      </GenerateAnAPIKey>
    </div>
  );
};
