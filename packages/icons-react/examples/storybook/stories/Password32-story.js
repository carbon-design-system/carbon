import React from 'react';
import { storiesOf } from '@storybook/react';
import Password32 from '../../../lib/password/32';

storiesOf('Password32', module)
  .add('default', () => <Password32 />)
  .add('with accessibility label', () => (
    <Password32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Password32 focusable>
      <title>Icon title</title>
    </Password32>
  ));
