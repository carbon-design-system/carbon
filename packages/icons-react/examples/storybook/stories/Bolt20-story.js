import React from 'react';
import { storiesOf } from '@storybook/react';
import Bolt20 from '../../../es/bolt/20.js';

storiesOf('Bolt20', module)
  .add('default', () => <Bolt20 />)
  .add('with accessibility label', () => (
    <Bolt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bolt20 aria-label="Icon label">
      <title>Icon title</title>
    </Bolt20>
  ));
