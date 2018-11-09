import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit32 from '../../../lib/Edit/32';

storiesOf('Edit32', module)
  .add('default', () => <Edit32 />)
  .add('with accessibility label', () => (
    <Edit32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit32 focusable>
      <title>Icon title</title>
    </Edit32>
  ));
