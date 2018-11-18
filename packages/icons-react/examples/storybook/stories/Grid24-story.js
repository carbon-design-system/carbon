import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid24 from '../../../es/grid/24.js';

storiesOf('Grid24', module)
  .add('default', () => <Grid24 />)
  .add('with accessibility label', () => (
    <Grid24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid24 aria-label="Icon label">
      <title>Icon title</title>
    </Grid24>
  ));
