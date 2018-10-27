import React from 'react';
import { storiesOf } from '@storybook/react';
import Box32 from '../../../lib/box/32';

storiesOf('Box32', module)
  .add('default', () => <Box32 />)
  .add('with accessibility label', () => (
    <Box32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Box32 focusable>
      <title>Icon title</title>
    </Box32>
  ));
