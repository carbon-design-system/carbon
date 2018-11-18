import React from 'react';
import { storiesOf } from '@storybook/react';
import At32 from '../../../es/at/32.js';

storiesOf('At32', module)
  .add('default', () => <At32 />)
  .add('with accessibility label', () => (
    <At32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <At32 aria-label="Icon label">
      <title>Icon title</title>
    </At32>
  ));
