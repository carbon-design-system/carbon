import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveManual32 from '../../../es/watson-health/3D-curve--manual/32.js';

storiesOf('WatsonHealth3DCurveManual32', module)
  .add('default', () => <WatsonHealth3DCurveManual32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveManual32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveManual32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveManual32>
  ));
