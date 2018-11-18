import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked24 from '../../../es/unlocked/24.js';

storiesOf('Unlocked24', module)
  .add('default', () => <Unlocked24 />)
  .add('with accessibility label', () => (
    <Unlocked24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked24 aria-label="Icon label">
      <title>Icon title</title>
    </Unlocked24>
  ));
