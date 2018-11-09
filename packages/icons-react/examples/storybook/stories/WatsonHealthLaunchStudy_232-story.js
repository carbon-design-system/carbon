import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_232 from '../../../lib/WatsonHealthLaunchStudy_2/32';

storiesOf('WatsonHealthLaunchStudy_232', module)
  .add('default', () => <WatsonHealthLaunchStudy_232 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_232 focusable>
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_232>
  ));
