import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff32 from '../../../lib/ViewOff/32';

storiesOf('ViewOff32', module)
  .add('default', () => <ViewOff32 />)
  .add('with accessibility label', () => (
    <ViewOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff32 focusable>
      <title>Icon title</title>
    </ViewOff32>
  ));
