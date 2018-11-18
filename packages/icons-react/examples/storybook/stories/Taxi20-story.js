import React from 'react';
import { storiesOf } from '@storybook/react';
import Taxi20 from '../../../es/taxi/20.js';

storiesOf('Taxi20', module)
  .add('default', () => <Taxi20 />)
  .add('with accessibility label', () => (
    <Taxi20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taxi20 aria-label="Icon label">
      <title>Icon title</title>
    </Taxi20>
  ));
