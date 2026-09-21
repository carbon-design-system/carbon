/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../src/components/Button';
import Checkbox from '../src/components/Checkbox';
import Form from '../src/components/Form';
import { InlineNotification } from '../src/components/Notification';
import Link from '../src/components/Link';
import { Stack } from '../src/components/Stack';
import TextArea from '../src/components/TextArea';
import TextInput from '../src/components/TextInput';

export default {
  title: 'CoForge/Create request',
  tags: ['!autodocs'],
  parameters: {
    controls: { hideNoControlsWarning: true },
    chromatic: { disableSnapshot: true },
  },
  globals: {
    coforgeSkin: 'on',
    backgrounds: { value: 'white' },
  },
};

export const Default = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notify, setNotify] = useState(false);
  const [status, setStatus] = useState('default');

  const invalid = status === 'error';

  return (
    <Form
      aria-label="Create request"
      onSubmit={(event) => {
        event.preventDefault();
        if (!title.trim()) {
          setStatus('error');
          return;
        }
        setStatus('success');
      }}>
      <Stack gap={6}>
        <h1>Create request</h1>
        {status === 'success' ? (
          <InlineNotification
            kind="success"
            title="Request submitted"
            subtitle="Placeholder calibration copy."
            lowContrast
            onClose={() => setStatus('default')}
          />
        ) : null}
        <TextInput
          id="create-request-title"
          labelText="Title"
          value={title}
          invalid={invalid}
          invalidText="Enter a title"
          onChange={(event) => {
            setTitle(event.target.value);
            if (status === 'error') {
              setStatus('default');
            }
          }}
        />
        <TextArea
          id="create-request-description"
          labelText="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Checkbox
          id="create-request-notify"
          labelText="Notify me when complete"
          checked={notify}
          onChange={(_, { checked }) => setNotify(checked)}
        />
        <Link href="#how-requests-are-routed">How requests are routed</Link>
        <Stack gap={3} orientation="horizontal">
          <Button kind="ghost" size="lg" type="button">
            Cancel
          </Button>
          <Button kind="primary" size="lg" type="submit">
            Submit request
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};
