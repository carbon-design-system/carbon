import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveManual24 from '../../../es/watson-health/3D-curve--manual/24.js';

storiesOf('WatsonHealth3DCurveManual24', module)
  .add('default', () => <WatsonHealth3DCurveManual24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveManual24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveManual24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveManual24>
  ));
