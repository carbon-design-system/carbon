import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid32 from '../../../lib/Grid/32';

storiesOf('Grid32', module)
  .add('default', () => <Grid32 />)
  .add('with accessibility label', () => (
    <Grid32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid32 focusable>
      <title>Icon title</title>
    </Grid32>
  ));
