import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit20 from '../../../es/edit/20.js';

storiesOf('Edit20', module)
  .add('default', () => <Edit20 />)
  .add('with accessibility label', () => (
    <Edit20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit20 aria-label="Icon label">
      <title>Icon title</title>
    </Edit20>
  ));
