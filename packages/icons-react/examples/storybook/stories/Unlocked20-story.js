import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked20 from '../../../es/unlocked/20.js';

storiesOf('Unlocked20', module)
  .add('default', () => <Unlocked20 />)
  .add('with accessibility label', () => (
    <Unlocked20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked20 aria-label="Icon label">
      <title>Icon title</title>
    </Unlocked20>
  ));
