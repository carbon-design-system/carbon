import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolid16 from '../../../lib/StopSolid/16';

storiesOf('StopSolid16', module)
  .add('default', () => <StopSolid16 />)
  .add('with accessibility label', () => (
    <StopSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolid16 focusable>
      <title>Icon title</title>
    </StopSolid16>
  ));
