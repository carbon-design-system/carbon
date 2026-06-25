/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  FormGroup,
  Toggle,
  Form,
  InlineLoading,
  PasswordInput,
} from '@carbon/react';
import { GenerateAnAPIKey, CustomStep } from '../components/GenerateAnAPIKey';
import { APIKeyDownloader } from '../../../../components/APIKeyModal/APIKeyDownloader';
import { InformationFilled, CheckmarkFilled } from '@carbon/react/icons';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiCall = async () => {
  await wait(1000);
  return '111-111-111-111';
};

export const CustomGenerate = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState('');
  const [allResources, setAllResources] = useState(false);
  const [resource, setResource] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const blockClass = `apikey-modal-pattern`;

  useEffect(() => {
    if (open && apiKey && passwordInputRef.current) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 0);
    }
  }, [open, apiKey]);

  const submitHandler = async () => {
    setLoading(true);
    const data = await apiCall();
    setApiKey(data);
    setLoading(false);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModal = () => {
    if (open) {
      setApiKey('');
      setName('');
      setPermissions('');
      setAllResources(false);
      setResource('');
      setLoading(false);
    }
    setOpen(!open);
  };

  const allResourcesHandler = () => {
    if (allResources && resource) {
      setResource('');
    }
    setAllResources((prev) => !prev);
  };

  const formHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    submitHandler();
  };

  const steps: CustomStep[] = [
    {
      valid: Boolean(name && permissions),
      title: 'Generate API key',
      content: (
        <>
          <p className={`${blockClass}__body`}>
            (Optional description text) To connect securely to [product name],
            your application or tool needs an API key with permission to access
            resources such as [product resource name].
          </p>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelText="Name your application"
            placeholder="Application name"
            id="name-input"
            data-modal-primary-focus
          />
          <FormGroup
            legendText="What do you want your application to be able to do"
            className={`${blockClass}__permissions`}
          >
            <RadioButtonGroup
              onChange={(opt) => setPermissions(opt as string)}
              valueSelected={permissions}
              name="permission"
              orientation="vertical"
              aria-label="permission"
            >
              <RadioButton value="Read and write" labelText="Read and write" />
              <RadioButton value="Read only" labelText="Read only" />
              <RadioButton value="Write only" labelText="Write only" />
            </RadioButtonGroup>
          </FormGroup>
        </>
      ),
    },
    {
      valid: allResources || (!allResources && !!resource),
      title: 'Choose which resources the API will have access to',
      content: (
        <>
          <Form onSubmit={formHandler}>
            <FormGroup
              legendText="What do you want your application to be able to do"
              className={`${blockClass}__resource-toggle`}
            >
              <Toggle
                onClick={allResourcesHandler}
                labelText="All resources"
                toggled={allResources}
                disabled={loading}
                id="toggle1"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </FormGroup>
            <FormGroup
              legendText="What do you want your application to be able to do"
              className={`${blockClass}__resource-name`}
            >
              <TextInput
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                labelText="Which resource?"
                placeholder="Resources name"
                disabled={loading || allResources}
                id="resource-input"
              />
            </FormGroup>
          </Form>
          {loading && (
            <InlineLoading
              description="Generating..."
              className={`${blockClass}__loader`}
            />
          )}
        </>
      ),
    },
  ];

  const modalProps = apiKey
    ? {
        modalHeading: 'Generate an API key',
        primaryButtonText: 'Copy',
        onRequestSubmit: copyKey,
        apiKeyLoaded: true,
        apiKey: apiKey,
        copyIconDescription: 'Copy',
        onCopy: copyKey,
      }
    : {
        modalHeading: undefined,
        primaryButtonText: 'Generate',
        onRequestSubmit: submitHandler,
        apiKeyLoaded: false,
      };

  return (
    <div className="app">
      <Button onClick={toggleModal}>Generate API key</Button>
      <GenerateAnAPIKey
        open={open}
        onRequestClose={toggleModal}
        secondaryButtonText="Close"
        modalLabel="An example of Generate API key"
        customSteps={steps}
        nextStepButtonText="Next"
        previousStepButtonText="Previous"
        {...modalProps}
      >
        {apiKey && (
          <>
            <PasswordInput
              id="custom-generated-api-key"
              labelText="Unique API key"
              value={apiKey}
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
                apiKey={apiKey}
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
        )}
      </GenerateAnAPIKey>
    </div>
  );
};
