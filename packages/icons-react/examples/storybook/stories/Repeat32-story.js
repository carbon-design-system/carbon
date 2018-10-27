import React from 'react';
import { storiesOf } from '@storybook/react';
import Repeat32 from '../../../lib/repeat/32';

storiesOf('Repeat32', module)
  .add('default', () => <Repeat32 />)
  .add('with accessibility label', () => (
    <Repeat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Repeat32 focusable>
      <title>Icon title</title>
    </Repeat32>
  ));
