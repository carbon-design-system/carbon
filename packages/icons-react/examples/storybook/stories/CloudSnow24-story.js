import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudSnow24 from '../../../es/cloud--snow/24.js';

storiesOf('CloudSnow24', module)
  .add('default', () => <CloudSnow24 />)
  .add('with accessibility label', () => (
    <CloudSnow24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudSnow24 aria-label="Icon label">
      <title>Icon title</title>
    </CloudSnow24>
  ));
