import React from 'react';
import { storiesOf } from '@storybook/react';
import Paste32 from '../../../es/paste/32.js';

storiesOf('Paste32', module)
  .add('default', () => <Paste32 />)
  .add('with accessibility label', () => (
    <Paste32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Paste32 aria-label="Icon label">
      <title>Icon title</title>
    </Paste32>
  ));
