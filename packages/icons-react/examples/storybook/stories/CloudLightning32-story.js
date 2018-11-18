import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudLightning32 from '../../../es/cloud--lightning/32.js';

storiesOf('CloudLightning32', module)
  .add('default', () => <CloudLightning32 />)
  .add('with accessibility label', () => (
    <CloudLightning32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudLightning32 aria-label="Icon label">
      <title>Icon title</title>
    </CloudLightning32>
  ));
