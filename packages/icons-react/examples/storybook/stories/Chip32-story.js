import React from 'react';
import { storiesOf } from '@storybook/react';
import Chip32 from '../../../lib/Chip/32';

storiesOf('Chip32', module)
  .add('default', () => <Chip32 />)
  .add('with accessibility label', () => (
    <Chip32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chip32 focusable>
      <title>Icon title</title>
    </Chip32>
  ));
