import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_232 from '../../../es/watson-health/launch-study--2/32.js';

storiesOf('WatsonHealthLaunchStudy_232', module)
  .add('default', () => <WatsonHealthLaunchStudy_232 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_232 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_232>
  ));
