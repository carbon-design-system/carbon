import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkmark32 from '../../../lib/checkmark/32';

storiesOf('Checkmark32', module)
  .add('default', () => <Checkmark32 />)
  .add('with accessibility label', () => (
    <Checkmark32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkmark32 focusable>
      <title>Icon title</title>
    </Checkmark32>
  ));
