import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked32 from '../../../es/locked/32.js';

storiesOf('Locked32', module)
  .add('default', () => <Locked32 />)
  .add('with accessibility label', () => (
    <Locked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked32 aria-label="Icon label">
      <title>Icon title</title>
    </Locked32>
  ));
