import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked16 from '../../../es/unlocked/16.js';

storiesOf('Unlocked16', module)
  .add('default', () => <Unlocked16 />)
  .add('with accessibility label', () => (
    <Unlocked16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked16 aria-label="Icon label">
      <title>Icon title</title>
    </Unlocked16>
  ));
