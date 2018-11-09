import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid16 from '../../../lib/Grid/16';

storiesOf('Grid16', module)
  .add('default', () => <Grid16 />)
  .add('with accessibility label', () => (
    <Grid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid16 focusable>
      <title>Icon title</title>
    </Grid16>
  ));
