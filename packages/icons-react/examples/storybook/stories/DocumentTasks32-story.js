import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentTasks32 from '../../../es/document--tasks/32.js';

storiesOf('DocumentTasks32', module)
  .add('default', () => <DocumentTasks32 />)
  .add('with accessibility label', () => (
    <DocumentTasks32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentTasks32 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentTasks32>
  ));
