import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkOutline16 from '../../../es/checkmark--outline/16.js';

storiesOf('CheckmarkOutline16', module)
  .add('default', () => <CheckmarkOutline16 />)
  .add('with accessibility label', () => (
    <CheckmarkOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkOutline16>
  ));
