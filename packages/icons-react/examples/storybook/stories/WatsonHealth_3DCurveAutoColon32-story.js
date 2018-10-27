import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DCurveAutoColon32 from '../../../lib/watson-health--3D-curve--auto-colon/32';

storiesOf('WatsonHealth_3DCurveAutoColon32', module)
  .add('default', () => <WatsonHealth_3DCurveAutoColon32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DCurveAutoColon32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DCurveAutoColon32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DCurveAutoColon32>
  ));
