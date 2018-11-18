import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff24 from '../../../es/view--off/24.js';

storiesOf('ViewOff24', module)
  .add('default', () => <ViewOff24 />)
  .add('with accessibility label', () => (
    <ViewOff24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff24 aria-label="Icon label">
      <title>Icon title</title>
    </ViewOff24>
  ));
