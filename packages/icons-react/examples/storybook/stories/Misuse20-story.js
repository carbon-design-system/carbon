import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse20 from '../../../es/misuse/20.js';

storiesOf('Misuse20', module)
  .add('default', () => <Misuse20 />)
  .add('with accessibility label', () => (
    <Misuse20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse20 aria-label="Icon label">
      <title>Icon title</title>
    </Misuse20>
  ));
