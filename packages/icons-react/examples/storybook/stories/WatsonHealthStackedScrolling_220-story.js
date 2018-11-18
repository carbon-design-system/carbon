import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_220 from '../../../es/watson-health/stacked-scrolling--2/20.js';

storiesOf('WatsonHealthStackedScrolling_220', module)
  .add('default', () => <WatsonHealthStackedScrolling_220 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_220 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_220>
  ));
