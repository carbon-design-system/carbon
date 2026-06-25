/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import {
  Button,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  FormGroup,
  Toggle,
  InlineLoading,
  Form,
} from '@carbon/react';
import { action } from 'storybook/actions';
import { pkg } from '../../settings';
import { APIKeyModal } from '.';
import wait from '../../global/js/utils/wait';
import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import mdx from './APIKeyModal.mdx';

export default {
  title: 'Patterns/Prebuilt patterns/APIKeyModal',
  component: APIKeyModal,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    generateSuccessBody: {
      control: {
        type: 'select',
        labels: {
          0: 'short body',
          1: 'long body',
        },
      },
      options: [0, 1],
      mapping: {
        0: <p>API key successfully created.</p>,
        1: (
          <p>
            This is your unique API key and is non-recoverable. If you lose this
            API key, you will have to reset it.
          </p>
        ),
      },
    },
    portalTarget: {
      control: false,
    },
  },
};

const defaultProps = {
  apiKey: '123-456-789',
  apiKeyLabel: 'API key',
  showAPIKeyLabel: 'Show key',
  hideAPIKeyLabel: 'Hide key',
  copyButtonText: 'Copy',
  copyIconDescription: 'Copy',
  hasAPIKeyVisibilityToggle: true,
  helperText:
    'This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it.',
  downloadLinkText: 'Download as JSON',
  downloadLinkLabel: 'Download API Key in Java Script File format',
  hasDownloadLink: true,
  downloadFileName: 'apikey',
  downloadFileType: 'json',
  open: true,
  closeButtonText: 'Close',
  generateSuccessMessage: 'API key successfully created',
  editSuccessMessage: 'API key successfully saved',
  loadingText: 'Generating...',
  modalLabel: 'An example of Generate API key',
};

const InstantTemplate = (args, context) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(undefined);
  const blockClass = `${pkg.prefix}--apikey-modal`;
  const generateKey = async () => {
    setLoading(true);
    await wait(1000);
    setOpen(true);
    setLoading(false);
  };

  return (
    <main>
      <style>{`.${blockClass} { opacity: 0; }`};</style>
      <APIKeyModal
        {...args}
        onClose={() => setOpen(false)}
        open={open}
        launcherButtonRef={buttonRef}
      />
      {loading ? (
        <Button
          renderIcon={InlineLoading}
          className={`${blockClass}__button-loading`}
        >
          Generating...
        </Button>
      ) : (
        <Button onClick={generateKey} ref={buttonRef}>
          Generate
        </Button>
      )}
    </main>
  );
};

const TemplateWithState = (args, context) => {
  const { error } = args;
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const buttonRef = useRef(undefined);
  const blockClass = `${pkg.prefix}--apikey-modal`;

  // eslint-disable-next-line
  const submitHandler = async (apiKeyName) => {
    action(`submitted ${apiKeyName}`)();
    setFetchError(false);
    setLoading(true);
    await wait(1000);
    if (error) {
      setFetchError(true);
    } else {
      setApiKey('111-111-111-111');
    }
    setLoading(false);
  };

  const onCloseHandler = () => {
    setOpen(false);
    setApiKey('');
  };

  return (
    <main>
      <style>{`.${blockClass} { opacity: 0; }`};</style>
      <APIKeyModal
        {...args}
        apiKey={apiKey}
        loading={loading}
        onClose={onCloseHandler}
        onRequestGenerate={submitHandler}
        open={open}
        error={fetchError}
        launcherButtonRef={buttonRef}
      />
      <Button onClick={() => setOpen(!open)} ref={buttonRef}>
        Generate API key
      </Button>
    </main>
  );
};

const MultiStepTemplate = (args, context) => {
  const { editing } = args;
  const {
    savedName,
    savedPermissions,
    savedAllResources,
    savedResource,
    ...finalArgs
  } = args;
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(undefined);
  const blockClass = `${pkg.prefix}--apikey-modal`;

  // multi step options
  const [name, setName] = useState(savedName);
  const [permissions, setPermissions] = useState(savedPermissions);
  const [allResources, setAllResources] = useState(savedAllResources);
  const [resource, setResource] = useState(savedResource);
  const [editSuccess, setEditSuccess] = useState(false);

  // eslint-disable-next-line
  const submitHandler = async () => {
    action('submitted')();
    setLoading(true);
    await wait(1000);
    if (editing) {
      setEditSuccess(true);
    } else {
      setApiKey('111-111-111-111');
    }
    setLoading(false);
  };

  const onCloseHandler = () => {
    setOpen(false);
    if (!editing) {
      setApiKey('');
      setName('');
      setPermissions('');
      setAllResources(false);
      setResource('');
    }
  };

  const formHandler = (evt) => {
    evt.preventDefault();
    submitHandler();
  };

  const allResourcesHandler = () => {
    if (allResources && resource) {
      setResource('');
    }
    setAllResources((prev) => !prev);
  };

  const steps = [
    {
      valid: Boolean(name && permissions),
      title: editing ? 'Edit API key' : 'Generate API key',
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
              onChange={(opt) => setPermissions(opt)}
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
              description={loading ? 'Saving...' : 'Generating...'}
            />
          )}
          {editSuccess && (
            <div className={`${blockClass}__messaging`}>
              Edited successfully, API key successfully saved.
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <main>
      <style>{`.${blockClass} { opacity: 0; }`};</style>
      <APIKeyModal
        {...finalArgs}
        apiKey={apiKey}
        loading={loading}
        onClose={onCloseHandler}
        onRequestEdit={submitHandler}
        onRequestGenerate={submitHandler}
        open={open}
        customSteps={steps}
        nameRequired={false}
        editSuccess={editSuccess}
        launcherButtonRef={buttonRef}
      />
      <Button onClick={() => setOpen(!open)} ref={buttonRef}>
        {editing ? 'Edit API key' : 'Generate API key'}
      </Button>
    </main>
  );
};

const EditTemplate = (args, context) => {
  const { error, apiKeyName } = args;
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const buttonRef = useRef(undefined);
  const blockClass = `${pkg.prefix}--apikey-modal`;

  const submitHandler = async () => {
    action(`submitted ${apiKeyName}`)();
    setFetchError(false);
    setLoading(true);
    await wait(1000);
    if (error) {
      setFetchError(true);
    } else {
      setFetchSuccess(true);
    }
    setLoading(false);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onOpenHandler = () => {
    setOpen(true);
  };

  return (
    <main>
      <style>{`.${blockClass} { opacity: 0; }`};</style>
      <APIKeyModal
        {...args}
        loading={loading}
        onClose={onCloseHandler}
        onRequestEdit={submitHandler}
        open={open}
        error={fetchError}
        editSuccess={fetchSuccess}
        launcherButtonRef={buttonRef}
      />
      <Button onClick={onOpenHandler} ref={buttonRef}>
        Edit API key
      </Button>
    </main>
  );
};

export const Generate = TemplateWithState.bind({});
Generate.args = {
  ...defaultProps,
  generateButtonText: 'Generate API key',
  generateTitle: 'Generate an API key',
  generateSuccessBody: 1,
  body: '(Optional description text) To connect securely to [product name], your application or tool needs an API key with permission to access resources such as [product resource name].',
  nameHelperText:
    'Providing the application name will help you identify your API key later.',
  nameLabel: 'Name your application',
  namePlaceholder: 'Application name',
  nameRequired: true,
};

export const GenerateWithError = TemplateWithState.bind({});
GenerateWithError.args = {
  ...defaultProps,
  hasAPIKeyVisibilityToggle: true,
  generateButtonText: 'Generate API key',
  generateTitle: 'Generate an API key',
  body: '(Optional description text) To connect securely to [product name], your application or tool needs an API key with permission to access resources such as [product resource name].',
  nameHelperText:
    'Providing the application name will help you identify your API key later.',
  nameLabel: 'Name your application',
  namePlaceholder: 'Application name',
  nameRequired: true,
  error: true,
  errorText: 'Failed to create API key',
};

export const InstantGenerate = InstantTemplate.bind({});
InstantGenerate.args = {
  ...defaultProps,
  apiKeyLabel: 'Unique API Key',
  generateTitle: 'Generate an API key',
};

export const CustomGenerate = MultiStepTemplate.bind({});
CustomGenerate.args = {
  ...defaultProps,
  generateButtonText: 'Generate',
  nextStepButtonText: 'Next',
  previousStepButtonText: 'Previous',
  downloadFileName: 'apikey',
  savedName: '',
  savedAllResources: false,
  savedResource: '',
  savedPermissions: '',
  generateTitle: 'Generate an API key',
};
CustomGenerate.parameters = {
  docs: {
    source: {
      // TODO provide better alternative source code, or remove this once the issue is resolved:
      // https://github.com/storybookjs/storybook/issues/11554
      code: 'Sorry, this feature is not currently available for this story',
    },
  },
};

export const Edit = EditTemplate.bind({});
Edit.args = {
  ...defaultProps,
  editButtonText: 'Save API key',
  generateTitle: 'Save an API key',
  body: '(Optional description text) To connect securely to [product name], your application or tool needs an API key with permission to access resources such as [product resource name].',
  nameHelperText:
    'Providing the application name will help you identify your API key later.',
  nameLabel: 'Name your application',
  namePlaceholder: 'Application name',
  nameRequired: true,
  editing: true,
  apiKey: '',
  loadingText: 'Saving...',
  apiKeyName: 'test_key_1',
};

export const EditWithError = EditTemplate.bind({});
EditWithError.args = {
  ...defaultProps,
  editButtonText: 'Save API key',
  generateTitle: 'Save an API key',
  body: '(Optional description text) To connect securely to [product name], your application or tool needs an API key with permission to access resources such as [product resource name].',
  nameHelperText:
    'Providing the application name will help you identify your API key later.',
  nameLabel: 'Name your application',
  namePlaceholder: 'Application name',
  nameRequired: true,
  editing: true,
  apiKey: '',
  loadingText: 'Saving...',
  generateSuccessBody: 'API Key saved.',
  apiKeyName: 'test_key_1',
  error: true,
  errorText: 'Failed to edit API key',
};

export const CustomEdit = MultiStepTemplate.bind({});
CustomEdit.args = {
  ...defaultProps,
  generateButtonText: 'Generate',
  nextStepButtonText: 'Next',
  previousStepButtonText: 'Previous',
  downloadFileName: 'apikey',
  savedName: 'test_key_1',
  savedAllResources: false,
  savedResource: 'resource_1',
  savedPermissions: 'Read only',
  editing: true,
  editButtonText: 'Save API key',
  generateTitle: 'Save an API key',
};
CustomEdit.parameters = {
  docs: {
    source: {
      // TODO provide better alternative source code, or remove this once the issue is resolved:
      // https://github.com/storybookjs/storybook/issues/11554
      code: 'Sorry, this feature is not currently available for this story',
    },
  },
};
