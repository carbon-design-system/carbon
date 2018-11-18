import React from 'react';
import { storiesOf } from '@storybook/react';
import Hearing24 from '../../../es/hearing/24.js';

storiesOf('Hearing24', module)
  .add('default', () => <Hearing24 />)
  .add('with accessibility label', () => (
    <Hearing24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hearing24 aria-label="Icon label">
      <title>Icon title</title>
    </Hearing24>
  ));
