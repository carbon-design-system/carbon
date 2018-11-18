import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit32 from '../../../es/edit/32.js';

storiesOf('Edit32', module)
  .add('default', () => <Edit32 />)
  .add('with accessibility label', () => (
    <Edit32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit32 aria-label="Icon label">
      <title>Icon title</title>
    </Edit32>
  ));
