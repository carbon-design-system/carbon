import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked20 from '../../../es/locked/20.js';

storiesOf('Locked20', module)
  .add('default', () => <Locked20 />)
  .add('with accessibility label', () => (
    <Locked20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked20 aria-label="Icon label">
      <title>Icon title</title>
    </Locked20>
  ));
