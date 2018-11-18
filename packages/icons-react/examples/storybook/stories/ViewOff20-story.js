import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff20 from '../../../es/view--off/20.js';

storiesOf('ViewOff20', module)
  .add('default', () => <ViewOff20 />)
  .add('with accessibility label', () => (
    <ViewOff20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff20 aria-label="Icon label">
      <title>Icon title</title>
    </ViewOff20>
  ));
