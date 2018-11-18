import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_120 from '../../../es/watson-health/stacked-scrolling--1/20.js';

storiesOf('WatsonHealthStackedScrolling_120', module)
  .add('default', () => <WatsonHealthStackedScrolling_120 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_120 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_120>
  ));
