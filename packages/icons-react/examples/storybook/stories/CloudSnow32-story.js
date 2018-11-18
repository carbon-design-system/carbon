import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudSnow32 from '../../../es/cloud--snow/32.js';

storiesOf('CloudSnow32', module)
  .add('default', () => <CloudSnow32 />)
  .add('with accessibility label', () => (
    <CloudSnow32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudSnow32 aria-label="Icon label">
      <title>Icon title</title>
    </CloudSnow32>
  ));
