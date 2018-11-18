import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked32 from '../../../es/unlocked/32.js';

storiesOf('Unlocked32', module)
  .add('default', () => <Unlocked32 />)
  .add('with accessibility label', () => (
    <Unlocked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked32 aria-label="Icon label">
      <title>Icon title</title>
    </Unlocked32>
  ));
