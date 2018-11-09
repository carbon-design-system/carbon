import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked16 from '../../../lib/Unlocked/16';

storiesOf('Unlocked16', module)
  .add('default', () => <Unlocked16 />)
  .add('with accessibility label', () => (
    <Unlocked16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked16 focusable>
      <title>Icon title</title>
    </Unlocked16>
  ));
