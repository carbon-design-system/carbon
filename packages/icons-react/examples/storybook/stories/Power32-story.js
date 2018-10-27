import React from 'react';
import { storiesOf } from '@storybook/react';
import Power32 from '../../../lib/power/32';

storiesOf('Power32', module)
  .add('default', () => <Power32 />)
  .add('with accessibility label', () => (
    <Power32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power32 focusable>
      <title>Icon title</title>
    </Power32>
  ));
