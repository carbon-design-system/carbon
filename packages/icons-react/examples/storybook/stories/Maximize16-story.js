import React from 'react';
import { storiesOf } from '@storybook/react';
import Maximize16 from '../../../es/maximize/16.js';

storiesOf('Maximize16', module)
  .add('default', () => <Maximize16 />)
  .add('with accessibility label', () => (
    <Maximize16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Maximize16 aria-label="Icon label">
      <title>Icon title</title>
    </Maximize16>
  ));
