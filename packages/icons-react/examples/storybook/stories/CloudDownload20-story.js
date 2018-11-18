import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudDownload20 from '../../../es/cloud--download/20.js';

storiesOf('CloudDownload20', module)
  .add('default', () => <CloudDownload20 />)
  .add('with accessibility label', () => (
    <CloudDownload20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudDownload20 aria-label="Icon label">
      <title>Icon title</title>
    </CloudDownload20>
  ));
