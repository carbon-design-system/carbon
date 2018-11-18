import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning32 from '../../../es/warning/32.js';

storiesOf('Warning32', module)
  .add('default', () => <Warning32 />)
  .add('with accessibility label', () => (
    <Warning32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning32 aria-label="Icon label">
      <title>Icon title</title>
    </Warning32>
  ));
