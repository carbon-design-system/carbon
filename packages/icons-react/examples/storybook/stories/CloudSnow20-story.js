import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudSnow20 from '../../../es/cloud--snow/20.js';

storiesOf('CloudSnow20', module)
  .add('default', () => <CloudSnow20 />)
  .add('with accessibility label', () => (
    <CloudSnow20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudSnow20 aria-label="Icon label">
      <title>Icon title</title>
    </CloudSnow20>
  ));
