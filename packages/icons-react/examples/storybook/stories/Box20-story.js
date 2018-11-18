import React from 'react';
import { storiesOf } from '@storybook/react';
import Box20 from '../../../es/box/20.js';

storiesOf('Box20', module)
  .add('default', () => <Box20 />)
  .add('with accessibility label', () => (
    <Box20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Box20 aria-label="Icon label">
      <title>Icon title</title>
    </Box20>
  ));
