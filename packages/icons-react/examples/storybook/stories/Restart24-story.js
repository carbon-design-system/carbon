import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart24 from '../../../es/restart/24.js';

storiesOf('Restart24', module)
  .add('default', () => <Restart24 />)
  .add('with accessibility label', () => (
    <Restart24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart24 aria-label="Icon label">
      <title>Icon title</title>
    </Restart24>
  ));
