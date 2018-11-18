import React from 'react';
import { storiesOf } from '@storybook/react';
import Arrival20 from '../../../es/arrival/20.js';

storiesOf('Arrival20', module)
  .add('default', () => <Arrival20 />)
  .add('with accessibility label', () => (
    <Arrival20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Arrival20 aria-label="Icon label">
      <title>Icon title</title>
    </Arrival20>
  ));
