import React from 'react';
import { storiesOf } from '@storybook/react';
import Taste20 from '../../../es/taste/20.js';

storiesOf('Taste20', module)
  .add('default', () => <Taste20 />)
  .add('with accessibility label', () => (
    <Taste20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taste20 aria-label="Icon label">
      <title>Icon title</title>
    </Taste20>
  ));
