import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3DCurveAutoColon20 from '../../../es/watson-health/3D-curve--auto-colon/20.js';

storiesOf('WatsonHealth3DCurveAutoColon20', module)
  .add('default', () => <WatsonHealth3DCurveAutoColon20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3DCurveAutoColon20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3DCurveAutoColon20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3DCurveAutoColon20>
  ));
