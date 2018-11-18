import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentTasks20 from '../../../es/document--tasks/20.js';

storiesOf('DocumentTasks20', module)
  .add('default', () => <DocumentTasks20 />)
  .add('with accessibility label', () => (
    <DocumentTasks20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentTasks20 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentTasks20>
  ));
