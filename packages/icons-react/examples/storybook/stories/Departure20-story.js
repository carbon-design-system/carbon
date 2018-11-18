import React from 'react';
import { storiesOf } from '@storybook/react';
import Departure20 from '../../../es/departure/20.js';

storiesOf('Departure20', module)
  .add('default', () => <Departure20 />)
  .add('with accessibility label', () => (
    <Departure20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Departure20 aria-label="Icon label">
      <title>Icon title</title>
    </Departure20>
  ));
