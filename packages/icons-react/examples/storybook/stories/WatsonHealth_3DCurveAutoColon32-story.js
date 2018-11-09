import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3DCurveAutoColon32 from '../../../lib/WatsonHealth_3DCurveAutoColon/32';

storiesOf('WatsonHealth_3DCurveAutoColon32', module)
  .add('default', () => <WatsonHealth_3DCurveAutoColon32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3DCurveAutoColon32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3DCurveAutoColon32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3DCurveAutoColon32>
  ));
