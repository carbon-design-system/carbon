import React from 'react';
import { storiesOf } from '@storybook/react';
import Temperature32 from '../../../es/temperature/32.js';

storiesOf('Temperature32', module)
  .add('default', () => <Temperature32 />)
  .add('with accessibility label', () => (
    <Temperature32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Temperature32 aria-label="Icon label">
      <title>Icon title</title>
    </Temperature32>
  ));
