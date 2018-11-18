import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked16 from '../../../es/locked/16.js';

storiesOf('Locked16', module)
  .add('default', () => <Locked16 />)
  .add('with accessibility label', () => (
    <Locked16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked16 aria-label="Icon label">
      <title>Icon title</title>
    </Locked16>
  ));
