import React from 'react';
import { storiesOf } from '@storybook/react';
import Watson20 from '../../../es/watson/20.js';

storiesOf('Watson20', module)
  .add('default', () => <Watson20 />)
  .add('with accessibility label', () => (
    <Watson20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Watson20 aria-label="Icon label">
      <title>Icon title</title>
    </Watson20>
  ));
