import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoVessels24 from '../../../es/watson-health/3D-curve--auto-vessels/24.js';

storiesOf('WatsonHealth3DCurveAutoVessels24', module)
  .add('default', () => <WatsonHealth3DCurveAutoVessels24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoVessels24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoVessels24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoVessels24>
  ));
