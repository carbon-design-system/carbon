import React from 'react';
import { storiesOf } from '@storybook/react';
import Hearing32 from '../../../es/hearing/32.js';

storiesOf('Hearing32', module)
  .add('default', () => <Hearing32 />)
  .add('with accessibility label', () => (
    <Hearing32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hearing32 aria-label="Icon label">
      <title>Icon title</title>
    </Hearing32>
  ));
