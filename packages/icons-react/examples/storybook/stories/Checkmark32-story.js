import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkmark32 from '../../../es/checkmark/32.js';

storiesOf('Checkmark32', module)
  .add('default', () => <Checkmark32 />)
  .add('with accessibility label', () => (
    <Checkmark32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkmark32 aria-label="Icon label">
      <title>Icon title</title>
    </Checkmark32>
  ));
