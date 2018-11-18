import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_324 from '../../../es/watson-health/launch-study--3/24.js';

storiesOf('WatsonHealthLaunchStudy_324', module)
  .add('default', () => <WatsonHealthLaunchStudy_324 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_324 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_324 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_324>
  ));
