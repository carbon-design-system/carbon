import React from 'react';
import { storiesOf } from '@storybook/react';
import Hd32 from '../../../es/HD/32.js';

storiesOf('Hd32', module)
  .add('default', () => <Hd32 />)
  .add('with accessibility label', () => (
    <Hd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hd32 aria-label="Icon label">
      <title>Icon title</title>
    </Hd32>
  ));
