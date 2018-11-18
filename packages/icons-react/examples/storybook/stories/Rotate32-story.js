import React from 'react';
import { storiesOf } from '@storybook/react';
import Rotate32 from '../../../es/rotate/32.js';

storiesOf('Rotate32', module)
  .add('default', () => <Rotate32 />)
  .add('with accessibility label', () => (
    <Rotate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rotate32 aria-label="Icon label">
      <title>Icon title</title>
    </Rotate32>
  ));
