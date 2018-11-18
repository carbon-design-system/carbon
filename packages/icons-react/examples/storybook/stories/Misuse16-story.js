import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse16 from '../../../es/misuse/16.js';

storiesOf('Misuse16', module)
  .add('default', () => <Misuse16 />)
  .add('with accessibility label', () => (
    <Misuse16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse16 aria-label="Icon label">
      <title>Icon title</title>
    </Misuse16>
  ));
