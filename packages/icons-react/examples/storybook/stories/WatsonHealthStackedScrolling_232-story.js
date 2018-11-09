import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStackedScrolling_232 from '../../../lib/WatsonHealthStackedScrolling_2/32';

storiesOf('WatsonHealthStackedScrolling_232', module)
  .add('default', () => <WatsonHealthStackedScrolling_232 />)
  .add('with accessibility label', () => (
    <WatsonHealthStackedScrolling_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStackedScrolling_232 focusable>
      <title>Icon title</title>
    </WatsonHealthStackedScrolling_232>
  ));
