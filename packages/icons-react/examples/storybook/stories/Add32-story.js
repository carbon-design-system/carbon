import React from 'react';
import { storiesOf } from '@storybook/react';
import Add32 from '../../../lib/Add/32';

storiesOf('Add32', module)
  .add('default', () => <Add32 />)
  .add('with accessibility label', () => (
    <Add32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Add32 focusable>
      <title>Icon title</title>
    </Add32>
  ));
