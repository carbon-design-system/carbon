import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudySkip32 from '../../../lib/watson-health--study--skip/32';

storiesOf('WatsonHealthStudySkip32', module)
  .add('default', () => <WatsonHealthStudySkip32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudySkip32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudySkip32 focusable>
      <title>Icon title</title>
    </WatsonHealthStudySkip32>
  ));
