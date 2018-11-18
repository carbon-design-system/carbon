import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_224 from '../../../es/watson-health/launch-study--2/24.js';

storiesOf('WatsonHealthLaunchStudy_224', module)
  .add('default', () => <WatsonHealthLaunchStudy_224 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_224 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_224>
  ));
