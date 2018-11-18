import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid20 from '../../../es/grid/20.js';

storiesOf('Grid20', module)
  .add('default', () => <Grid20 />)
  .add('with accessibility label', () => (
    <Grid20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Grid20 aria-label="Icon label">
      <title>Icon title</title>
    </Grid20>
  ));
