import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff32 from '../../../es/view--off/32.js';

storiesOf('ViewOff32', module)
  .add('default', () => <ViewOff32 />)
  .add('with accessibility label', () => (
    <ViewOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff32 aria-label="Icon label">
      <title>Icon title</title>
    </ViewOff32>
  ));
