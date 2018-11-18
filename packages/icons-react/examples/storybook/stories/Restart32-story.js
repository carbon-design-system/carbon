import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart32 from '../../../es/restart/32.js';

storiesOf('Restart32', module)
  .add('default', () => <Restart32 />)
  .add('with accessibility label', () => (
    <Restart32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart32 aria-label="Icon label">
      <title>Icon title</title>
    </Restart32>
  ));
