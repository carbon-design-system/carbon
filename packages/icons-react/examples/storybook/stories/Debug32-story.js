import React from 'react';
import { storiesOf } from '@storybook/react';
import Debug32 from '../../../es/debug/32.js';

storiesOf('Debug32', module)
  .add('default', () => <Debug32 />)
  .add('with accessibility label', () => (
    <Debug32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Debug32 aria-label="Icon label">
      <title>Icon title</title>
    </Debug32>
  ));
