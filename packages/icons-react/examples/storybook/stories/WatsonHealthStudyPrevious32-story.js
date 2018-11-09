import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyPrevious32 from '../../../lib/WatsonHealthStudyPrevious/32';

storiesOf('WatsonHealthStudyPrevious32', module)
  .add('default', () => <WatsonHealthStudyPrevious32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyPrevious32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyPrevious32 focusable>
      <title>Icon title</title>
    </WatsonHealthStudyPrevious32>
  ));
