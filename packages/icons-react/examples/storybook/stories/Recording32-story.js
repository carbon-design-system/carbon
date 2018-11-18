import React from 'react';
import { storiesOf } from '@storybook/react';
import Recording32 from '../../../es/recording/32.js';

storiesOf('Recording32', module)
  .add('default', () => <Recording32 />)
  .add('with accessibility label', () => (
    <Recording32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recording32 aria-label="Icon label">
      <title>Icon title</title>
    </Recording32>
  ));
