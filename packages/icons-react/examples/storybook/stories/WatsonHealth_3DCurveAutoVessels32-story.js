import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DCurveAutoVessels32 from '../../../lib/watson-health--3D-curve--auto-vessels/32';

storiesOf('WatsonHealth_3DCurveAutoVessels32', module)
  .add('default', () => <WatsonHealth_3DCurveAutoVessels32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DCurveAutoVessels32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DCurveAutoVessels32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DCurveAutoVessels32>
  ));
