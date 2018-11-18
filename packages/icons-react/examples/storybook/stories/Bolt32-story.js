import React from 'react';
import { storiesOf } from '@storybook/react';
import Bolt32 from '../../../es/bolt/32.js';

storiesOf('Bolt32', module)
  .add('default', () => <Bolt32 />)
  .add('with accessibility label', () => (
    <Bolt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bolt32 aria-label="Icon label">
      <title>Icon title</title>
    </Bolt32>
  ));
