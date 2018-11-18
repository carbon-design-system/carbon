import React from 'react';
import { storiesOf } from '@storybook/react';
import Box32 from '../../../es/box/32.js';

storiesOf('Box32', module)
  .add('default', () => <Box32 />)
  .add('with accessibility label', () => (
    <Box32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Box32 aria-label="Icon label">
      <title>Icon title</title>
    </Box32>
  ));
