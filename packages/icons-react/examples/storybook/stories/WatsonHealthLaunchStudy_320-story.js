import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_320 from '../../../es/watson-health/launch-study--3/20.js';

storiesOf('WatsonHealthLaunchStudy_320', module)
  .add('default', () => <WatsonHealthLaunchStudy_320 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_320 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_320 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_320>
  ));
