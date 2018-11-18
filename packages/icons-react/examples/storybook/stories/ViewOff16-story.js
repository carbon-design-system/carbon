import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff16 from '../../../es/view--off/16.js';

storiesOf('ViewOff16', module)
  .add('default', () => <ViewOff16 />)
  .add('with accessibility label', () => (
    <ViewOff16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff16 aria-label="Icon label">
      <title>Icon title</title>
    </ViewOff16>
  ));
