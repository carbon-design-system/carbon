import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize32 from '../../../es/minimize/32.js';

storiesOf('Minimize32', module)
  .add('default', () => <Minimize32 />)
  .add('with accessibility label', () => (
    <Minimize32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize32 aria-label="Icon label">
      <title>Icon title</title>
    </Minimize32>
  ));
