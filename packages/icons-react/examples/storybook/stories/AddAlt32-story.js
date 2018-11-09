import React from 'react';
import { storiesOf } from '@storybook/react';
import AddAlt32 from '../../../lib/AddAlt/32';

storiesOf('AddAlt32', module)
  .add('default', () => <AddAlt32 />)
  .add('with accessibility label', () => (
    <AddAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddAlt32 focusable>
      <title>Icon title</title>
    </AddAlt32>
  ));
