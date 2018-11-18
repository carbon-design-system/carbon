import React from 'react';
import { storiesOf } from '@storybook/react';
import Scale24 from '../../../es/scale/24.js';

storiesOf('Scale24', module)
  .add('default', () => <Scale24 />)
  .add('with accessibility label', () => (
    <Scale24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scale24 aria-label="Icon label">
      <title>Icon title</title>
    </Scale24>
  ));
