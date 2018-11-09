import React from 'react';
import { storiesOf } from '@storybook/react';
import Paste32 from '../../../lib/Paste/32';

storiesOf('Paste32', module)
  .add('default', () => <Paste32 />)
  .add('with accessibility label', () => (
    <Paste32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Paste32 focusable>
      <title>Icon title</title>
    </Paste32>
  ));
