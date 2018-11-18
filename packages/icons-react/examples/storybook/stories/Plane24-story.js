import React from 'react';
import { storiesOf } from '@storybook/react';
import Plane24 from '../../../es/plane/24.js';

storiesOf('Plane24', module)
  .add('default', () => <Plane24 />)
  .add('with accessibility label', () => (
    <Plane24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Plane24 aria-label="Icon label">
      <title>Icon title</title>
    </Plane24>
  ));
