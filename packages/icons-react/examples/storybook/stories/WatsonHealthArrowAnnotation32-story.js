import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthArrowAnnotation32 from '../../../lib/watson-health--arrow-annotation/32';

storiesOf('WatsonHealthArrowAnnotation32', module)
  .add('default', () => <WatsonHealthArrowAnnotation32 />)
  .add('with accessibility label', () => (
    <WatsonHealthArrowAnnotation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthArrowAnnotation32 focusable>
      <title>Icon title</title>
    </WatsonHealthArrowAnnotation32>
  ));
