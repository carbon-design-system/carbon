import React from 'react';
import { storiesOf } from '@storybook/react';
import Desktop32 from '../../../lib/Desktop/32';

storiesOf('Desktop32', module)
  .add('default', () => <Desktop32 />)
  .add('with accessibility label', () => (
    <Desktop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Desktop32 focusable>
      <title>Icon title</title>
    </Desktop32>
  ));
