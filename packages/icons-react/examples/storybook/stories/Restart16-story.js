import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart16 from '../../../es/restart/16.js';

storiesOf('Restart16', module)
  .add('default', () => <Restart16 />)
  .add('with accessibility label', () => (
    <Restart16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart16 aria-label="Icon label">
      <title>Icon title</title>
    </Restart16>
  ));
