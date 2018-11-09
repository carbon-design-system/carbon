import React from 'react';
import { storiesOf } from '@storybook/react';
import Debug32 from '../../../lib/Debug/32';

storiesOf('Debug32', module)
  .add('default', () => <Debug32 />)
  .add('with accessibility label', () => (
    <Debug32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Debug32 focusable>
      <title>Icon title</title>
    </Debug32>
  ));
