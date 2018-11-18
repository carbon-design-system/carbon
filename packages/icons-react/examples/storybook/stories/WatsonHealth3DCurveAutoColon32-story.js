import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoColon32 from '../../../es/watson-health/3D-curve--auto-colon/32.js';

storiesOf('WatsonHealth3DCurveAutoColon32', module)
  .add('default', () => <WatsonHealth3DCurveAutoColon32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoColon32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoColon32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoColon32>
  ));
