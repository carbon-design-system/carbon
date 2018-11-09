import React from 'react';
import { storiesOf } from '@storybook/react';
import Column32 from '../../../lib/Column/32';

storiesOf('Column32', module)
  .add('default', () => <Column32 />)
  .add('with accessibility label', () => (
    <Column32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Column32 focusable>
      <title>Icon title</title>
    </Column32>
  ));
