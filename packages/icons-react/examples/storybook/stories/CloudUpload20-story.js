import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudUpload20 from '../../../es/cloud--upload/20.js';

storiesOf('CloudUpload20', module)
  .add('default', () => <CloudUpload20 />)
  .add('with accessibility label', () => (
    <CloudUpload20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudUpload20 aria-label="Icon label">
      <title>Icon title</title>
    </CloudUpload20>
  ));
