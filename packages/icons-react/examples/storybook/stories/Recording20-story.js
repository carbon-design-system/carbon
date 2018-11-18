import React from 'react';
import { storiesOf } from '@storybook/react';
import Recording20 from '../../../es/recording/20.js';

storiesOf('Recording20', module)
  .add('default', () => <Recording20 />)
  .add('with accessibility label', () => (
    <Recording20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recording20 aria-label="Icon label">
      <title>Icon title</title>
    </Recording20>
  ));
