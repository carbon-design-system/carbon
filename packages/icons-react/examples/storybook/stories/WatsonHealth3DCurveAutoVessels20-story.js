import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoVessels20 from '../../../es/watson-health/3D-curve--auto-vessels/20.js';

storiesOf('WatsonHealth3DCurveAutoVessels20', module)
  .add('default', () => <WatsonHealth3DCurveAutoVessels20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoVessels20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoVessels20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoVessels20>
  ));
