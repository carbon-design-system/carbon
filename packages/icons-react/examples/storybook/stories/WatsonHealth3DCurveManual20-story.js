import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveManual20 from '../../../es/watson-health/3D-curve--manual/20.js';

storiesOf('WatsonHealth3DCurveManual20', module)
  .add('default', () => <WatsonHealth3DCurveManual20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveManual20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveManual20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveManual20>
  ));
