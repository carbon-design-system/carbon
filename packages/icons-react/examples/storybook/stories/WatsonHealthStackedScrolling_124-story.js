import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_124 from '../../../es/watson-health/stacked-scrolling--1/24.js';

storiesOf('WatsonHealthStackedScrolling_124', module)
  .add('default', () => <WatsonHealthStackedScrolling_124 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_124 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_124>
  ));
