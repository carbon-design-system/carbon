import React from 'react';
import { storiesOf } from '@storybook/react';
import Taste32 from '../../../es/taste/32.js';

storiesOf('Taste32', module)
  .add('default', () => <Taste32 />)
  .add('with accessibility label', () => (
    <Taste32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taste32 aria-label="Icon label">
      <title>Icon title</title>
    </Taste32>
  ));
