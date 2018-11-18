import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudDownload24 from '../../../es/cloud--download/24.js';

storiesOf('CloudDownload24', module)
  .add('default', () => <CloudDownload24 />)
  .add('with accessibility label', () => (
    <CloudDownload24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudDownload24 aria-label="Icon label">
      <title>Icon title</title>
    </CloudDownload24>
  ));
