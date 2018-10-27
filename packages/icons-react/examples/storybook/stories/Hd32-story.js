import React from 'react';
import { storiesOf } from '@storybook/react';
import Hd32 from '../../../lib/HD/32';

storiesOf('Hd32', module)
  .add('default', () => <Hd32 />)
  .add('with accessibility label', () => (
    <Hd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hd32 focusable>
      <title>Icon title</title>
    </Hd32>
  ));
