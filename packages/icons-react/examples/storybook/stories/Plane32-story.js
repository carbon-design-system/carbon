import React from 'react';
import { storiesOf } from '@storybook/react';
import Plane32 from '../../../es/plane/32.js';

storiesOf('Plane32', module)
  .add('default', () => <Plane32 />)
  .add('with accessibility label', () => (
    <Plane32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Plane32 aria-label="Icon label">
      <title>Icon title</title>
    </Plane32>
  ));
