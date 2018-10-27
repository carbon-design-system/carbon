import React from 'react';
import { storiesOf } from '@storybook/react';
import Indent32 from '../../../lib/indent/32';

storiesOf('Indent32', module)
  .add('default', () => <Indent32 />)
  .add('with accessibility label', () => (
    <Indent32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Indent32 focusable>
      <title>Icon title</title>
    </Indent32>
  ));
