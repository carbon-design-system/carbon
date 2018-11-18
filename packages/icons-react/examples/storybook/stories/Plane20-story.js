import React from 'react';
import { storiesOf } from '@storybook/react';
import Plane20 from '../../../es/plane/20.js';

storiesOf('Plane20', module)
  .add('default', () => <Plane20 />)
  .add('with accessibility label', () => (
    <Plane20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Plane20 aria-label="Icon label">
      <title>Icon title</title>
    </Plane20>
  ));
