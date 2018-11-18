import React from 'react';
import { storiesOf } from '@storybook/react';
import Temperature20 from '../../../es/temperature/20.js';

storiesOf('Temperature20', module)
  .add('default', () => <Temperature20 />)
  .add('with accessibility label', () => (
    <Temperature20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Temperature20 aria-label="Icon label">
      <title>Icon title</title>
    </Temperature20>
  ));
