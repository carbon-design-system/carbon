import React from 'react';
import { storiesOf } from '@storybook/react';
import Star16 from '../../../es/star/16.js';

storiesOf('Star16', module)
  .add('default', () => <Star16 />)
  .add('with accessibility label', () => (
    <Star16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Star16 aria-label="Icon label">
      <title>Icon title</title>
    </Star16>
  ));
