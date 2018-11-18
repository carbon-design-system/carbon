import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoVessels32 from '../../../es/watson-health/3D-curve--auto-vessels/32.js';

storiesOf('WatsonHealth3DCurveAutoVessels32', module)
  .add('default', () => <WatsonHealth3DCurveAutoVessels32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoVessels32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoVessels32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoVessels32>
  ));
