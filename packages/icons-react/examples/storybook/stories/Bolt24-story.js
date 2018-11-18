import React from 'react';
import { storiesOf } from '@storybook/react';
import Bolt24 from '../../../es/bolt/24.js';

storiesOf('Bolt24', module)
  .add('default', () => <Bolt24 />)
  .add('with accessibility label', () => (
    <Bolt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bolt24 aria-label="Icon label">
      <title>Icon title</title>
    </Bolt24>
  ));
