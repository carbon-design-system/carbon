import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudUpload24 from '../../../es/cloud--upload/24.js';

storiesOf('CloudUpload24', module)
  .add('default', () => <CloudUpload24 />)
  .add('with accessibility label', () => (
    <CloudUpload24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudUpload24 aria-label="Icon label">
      <title>Icon title</title>
    </CloudUpload24>
  ));
