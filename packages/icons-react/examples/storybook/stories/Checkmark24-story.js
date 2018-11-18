import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkmark24 from '../../../es/checkmark/24.js';

storiesOf('Checkmark24', module)
  .add('default', () => <Checkmark24 />)
  .add('with accessibility label', () => (
    <Checkmark24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkmark24 aria-label="Icon label">
      <title>Icon title</title>
    </Checkmark24>
  ));
