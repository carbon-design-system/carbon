import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyNext32 from '../../../lib/watson-health--study--next/32';

storiesOf('WatsonHealthStudyNext32', module)
  .add('default', () => <WatsonHealthStudyNext32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyNext32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyNext32 focusable>
      <title>Icon title</title>
    </WatsonHealthStudyNext32>
  ));
