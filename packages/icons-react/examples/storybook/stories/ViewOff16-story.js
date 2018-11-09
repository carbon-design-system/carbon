import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewOff16 from '../../../lib/ViewOff/16';

storiesOf('ViewOff16', module)
  .add('default', () => <ViewOff16 />)
  .add('with accessibility label', () => (
    <ViewOff16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewOff16 focusable>
      <title>Icon title</title>
    </ViewOff16>
  ));
