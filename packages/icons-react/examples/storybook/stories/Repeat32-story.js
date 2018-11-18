import React from 'react';
import { storiesOf } from '@storybook/react';
import Repeat32 from '../../../es/repeat/32.js';

storiesOf('Repeat32', module)
  .add('default', () => <Repeat32 />)
  .add('with accessibility label', () => (
    <Repeat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Repeat32 aria-label="Icon label">
      <title>Icon title</title>
    </Repeat32>
  ));
