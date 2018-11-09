import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_332 from '../../../lib/WatsonHealthLaunchStudy_3/32';

storiesOf('WatsonHealthLaunchStudy_332', module)
  .add('default', () => <WatsonHealthLaunchStudy_332 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_332 focusable>
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_332>
  ));
