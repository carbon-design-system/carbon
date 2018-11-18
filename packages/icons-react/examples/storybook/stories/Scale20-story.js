import React from 'react';
import { storiesOf } from '@storybook/react';
import Scale20 from '../../../es/scale/20.js';

storiesOf('Scale20', module)
  .add('default', () => <Scale20 />)
  .add('with accessibility label', () => (
    <Scale20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scale20 aria-label="Icon label">
      <title>Icon title</title>
    </Scale20>
  ));
