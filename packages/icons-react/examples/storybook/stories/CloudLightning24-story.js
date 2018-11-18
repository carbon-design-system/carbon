import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudLightning24 from '../../../es/cloud--lightning/24.js';

storiesOf('CloudLightning24', module)
  .add('default', () => <CloudLightning24 />)
  .add('with accessibility label', () => (
    <CloudLightning24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudLightning24 aria-label="Icon label">
      <title>Icon title</title>
    </CloudLightning24>
  ));
