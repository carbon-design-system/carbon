import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DCurveManual32 from '../../../lib/watson-health--3D-curve--manual/32';

storiesOf('WatsonHealth_3DCurveManual32', module)
  .add('default', () => <WatsonHealth_3DCurveManual32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DCurveManual32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DCurveManual32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DCurveManual32>
  ));
