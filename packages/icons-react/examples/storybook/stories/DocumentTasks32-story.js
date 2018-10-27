import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentTasks32 from '../../../lib/document--tasks/32';

storiesOf('DocumentTasks32', module)
  .add('default', () => <DocumentTasks32 />)
  .add('with accessibility label', () => (
    <DocumentTasks32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentTasks32 focusable>
      <title>Icon title</title>
    </DocumentTasks32>
  ));
