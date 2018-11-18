import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentTasks24 from '../../../es/document--tasks/24.js';

storiesOf('DocumentTasks24', module)
  .add('default', () => <DocumentTasks24 />)
  .add('with accessibility label', () => (
    <DocumentTasks24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentTasks24 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentTasks24>
  ));
