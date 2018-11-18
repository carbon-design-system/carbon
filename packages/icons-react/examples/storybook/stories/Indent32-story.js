import React from 'react';
import { storiesOf } from '@storybook/react';
import Indent32 from '../../../es/indent/32.js';

storiesOf('Indent32', module)
  .add('default', () => <Indent32 />)
  .add('with accessibility label', () => (
    <Indent32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Indent32 aria-label="Icon label">
      <title>Icon title</title>
    </Indent32>
  ));
