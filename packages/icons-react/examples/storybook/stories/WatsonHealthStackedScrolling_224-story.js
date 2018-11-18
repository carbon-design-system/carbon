import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_224 from '../../../es/watson-health/stacked-scrolling--2/24.js';

storiesOf('WatsonHealthStackedScrolling_224', module)
  .add('default', () => <WatsonHealthStackedScrolling_224 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_224 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_224>
  ));
