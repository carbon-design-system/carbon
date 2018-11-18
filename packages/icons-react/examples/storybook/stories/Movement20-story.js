import React from 'react';
import { storiesOf } from '@storybook/react';
import Movement20 from '../../../es/movement/20.js';

storiesOf('Movement20', module)
  .add('default', () => <Movement20 />)
  .add('with accessibility label', () => (
    <Movement20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Movement20 aria-label="Icon label">
      <title>Icon title</title>
    </Movement20>
  ));
