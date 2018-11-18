import React from 'react';
import { storiesOf } from '@storybook/react';
import Subtract20 from '../../../es/subtract/20.js';

storiesOf('Subtract20', module)
  .add('default', () => <Subtract20 />)
  .add('with accessibility label', () => (
    <Subtract20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Subtract20 aria-label="Icon label">
      <title>Icon title</title>
    </Subtract20>
  ));
