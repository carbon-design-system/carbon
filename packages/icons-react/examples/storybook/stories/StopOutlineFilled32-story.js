import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled32 from '../../../lib/stop--outline--filled/32';

storiesOf('StopOutlineFilled32', module)
  .add('default', () => <StopOutlineFilled32 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled32 focusable>
      <title>Icon title</title>
    </StopOutlineFilled32>
  ));
