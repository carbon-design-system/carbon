import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudLightning20 from '../../../es/cloud--lightning/20.js';

storiesOf('CloudLightning20', module)
  .add('default', () => <CloudLightning20 />)
  .add('with accessibility label', () => (
    <CloudLightning20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudLightning20 aria-label="Icon label">
      <title>Icon title</title>
    </CloudLightning20>
  ));
