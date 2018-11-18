import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize16 from '../../../es/minimize/16.js';

storiesOf('Minimize16', module)
  .add('default', () => <Minimize16 />)
  .add('with accessibility label', () => (
    <Minimize16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize16 aria-label="Icon label">
      <title>Icon title</title>
    </Minimize16>
  ));
