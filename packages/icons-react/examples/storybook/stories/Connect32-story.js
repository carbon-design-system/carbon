import React from 'react';
import { storiesOf } from '@storybook/react';
import Connect32 from '../../../lib/Connect/32';

storiesOf('Connect32', module)
  .add('default', () => <Connect32 />)
  .add('with accessibility label', () => (
    <Connect32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Connect32 focusable>
      <title>Icon title</title>
    </Connect32>
  ));
