import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled24 from '../../../es/stop--outline--filled/24.js';

storiesOf('StopOutlineFilled24', module)
  .add('default', () => <StopOutlineFilled24 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutlineFilled24>
  ));
