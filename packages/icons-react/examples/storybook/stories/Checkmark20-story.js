import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkmark20 from '../../../es/checkmark/20.js';

storiesOf('Checkmark20', module)
  .add('default', () => <Checkmark20 />)
  .add('with accessibility label', () => (
    <Checkmark20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkmark20 aria-label="Icon label">
      <title>Icon title</title>
    </Checkmark20>
  ));
