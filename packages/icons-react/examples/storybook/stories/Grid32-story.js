import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid32 from '../../../es/grid/32.js';

storiesOf('Grid32', module)
  .add('default', () => <Grid32 />)
  .add('with accessibility label', () => (
    <Grid32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid32 aria-label="Icon label">
      <title>Icon title</title>
    </Grid32>
  ));
