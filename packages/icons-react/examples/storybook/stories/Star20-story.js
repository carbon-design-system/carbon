import React from 'react';
import { storiesOf } from '@storybook/react';
import Star20 from '../../../es/star/20.js';

storiesOf('Star20', module)
  .add('default', () => <Star20 />)
  .add('with accessibility label', () => (
    <Star20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Star20 aria-label="Icon label">
      <title>Icon title</title>
    </Star20>
  ));
