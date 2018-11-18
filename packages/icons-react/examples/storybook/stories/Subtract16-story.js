import React from 'react';
import { storiesOf } from '@storybook/react';
import Subtract16 from '../../../es/subtract/16.js';

storiesOf('Subtract16', module)
  .add('default', () => <Subtract16 />)
  .add('with accessibility label', () => (
    <Subtract16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Subtract16 aria-label="Icon label">
      <title>Icon title</title>
    </Subtract16>
  ));
