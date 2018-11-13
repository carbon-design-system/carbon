import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled16 from '../../../lib/StopOutlineFilled/16';

storiesOf('StopOutlineFilled16', module)
  .add('default', () => <StopOutlineFilled16 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled16 focusable>
      <title>Icon title</title>
    </StopOutlineFilled16>
  ));
