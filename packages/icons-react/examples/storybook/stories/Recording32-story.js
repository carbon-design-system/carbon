import React from 'react';
import { storiesOf } from '@storybook/react';
import Recording32 from '../../../lib/recording/32';

storiesOf('Recording32', module)
  .add('default', () => <Recording32 />)
  .add('with accessibility label', () => (
    <Recording32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recording32 focusable>
      <title>Icon title</title>
    </Recording32>
  ));
