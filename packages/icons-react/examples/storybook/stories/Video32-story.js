import React from 'react';
import { storiesOf } from '@storybook/react';
import Video32 from '../../../lib/Video/32';

storiesOf('Video32', module)
  .add('default', () => <Video32 />)
  .add('with accessibility label', () => (
    <Video32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Video32 focusable>
      <title>Icon title</title>
    </Video32>
  ));
