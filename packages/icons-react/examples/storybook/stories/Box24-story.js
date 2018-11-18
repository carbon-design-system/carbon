import React from 'react';
import { storiesOf } from '@storybook/react';
import Box24 from '../../../es/box/24.js';

storiesOf('Box24', module)
  .add('default', () => <Box24 />)
  .add('with accessibility label', () => (
    <Box24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Box24 aria-label="Icon label">
      <title>Icon title</title>
    </Box24>
  ));
