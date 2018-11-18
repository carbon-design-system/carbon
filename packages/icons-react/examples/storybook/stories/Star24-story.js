import React from 'react';
import { storiesOf } from '@storybook/react';
import Star24 from '../../../es/star/24.js';

storiesOf('Star24', module)
  .add('default', () => <Star24 />)
  .add('with accessibility label', () => (
    <Star24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Star24 aria-label="Icon label">
      <title>Icon title</title>
    </Star24>
  ));
