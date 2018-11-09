import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlocked32 from '../../../lib/Unlocked/32';

storiesOf('Unlocked32', module)
  .add('default', () => <Unlocked32 />)
  .add('with accessibility label', () => (
    <Unlocked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlocked32 focusable>
      <title>Icon title</title>
    </Unlocked32>
  ));
