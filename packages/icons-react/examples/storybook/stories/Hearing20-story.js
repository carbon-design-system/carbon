import React from 'react';
import { storiesOf } from '@storybook/react';
import Hearing20 from '../../../es/hearing/20.js';

storiesOf('Hearing20', module)
  .add('default', () => <Hearing20 />)
  .add('with accessibility label', () => (
    <Hearing20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hearing20 aria-label="Icon label">
      <title>Icon title</title>
    </Hearing20>
  ));
