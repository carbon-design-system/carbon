import React from 'react';
import { storiesOf } from '@storybook/react';
import Collaborate24 from '../../../es/collaborate/24.js';

storiesOf('Collaborate24', module)
  .add('default', () => <Collaborate24 />)
  .add('with accessibility label', () => (
    <Collaborate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Collaborate24 aria-label="Icon label">
      <title>Icon title</title>
    </Collaborate24>
  ));
