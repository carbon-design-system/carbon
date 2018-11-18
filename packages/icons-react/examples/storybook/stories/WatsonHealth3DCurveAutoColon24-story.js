import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoColon24 from '../../../es/watson-health/3D-curve--auto-colon/24.js';

storiesOf('WatsonHealth3DCurveAutoColon24', module)
  .add('default', () => <WatsonHealth3DCurveAutoColon24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoColon24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoColon24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoColon24>
  ));
