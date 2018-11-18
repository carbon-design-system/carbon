import React from 'react';
import { storiesOf } from '@storybook/react';
import Recording24 from '../../../es/recording/24.js';

storiesOf('Recording24', module)
  .add('default', () => <Recording24 />)
  .add('with accessibility label', () => (
    <Recording24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recording24 aria-label="Icon label">
      <title>Icon title</title>
    </Recording24>
  ));
