import React from 'react';
import { storiesOf } from '@storybook/react';
import Move20 from '../../../es/move/20.js';

storiesOf('Move20', module)
  .add('default', () => <Move20 />)
  .add('with accessibility label', () => (
    <Move20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Move20 aria-label="Icon label">
      <title>Icon title</title>
    </Move20>
  ));
