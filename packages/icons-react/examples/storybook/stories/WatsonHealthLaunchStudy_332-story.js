import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_332 from '../../../es/watson-health/launch-study--3/32.js';

storiesOf('WatsonHealthLaunchStudy_332', module)
  .add('default', () => <WatsonHealthLaunchStudy_332 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_332 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_332>
  ));
