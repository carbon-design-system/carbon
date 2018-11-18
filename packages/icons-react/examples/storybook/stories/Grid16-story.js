import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid16 from '../../../es/grid/16.js';

storiesOf('Grid16', module)
  .add('default', () => <Grid16 />)
  .add('with accessibility label', () => (
    <Grid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid16 aria-label="Icon label">
      <title>Icon title</title>
    </Grid16>
  ));
