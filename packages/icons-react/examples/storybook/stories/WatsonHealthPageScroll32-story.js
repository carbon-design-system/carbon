import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPageScroll32 from '../../../lib/watson-health--page-scroll/32';

storiesOf('WatsonHealthPageScroll32', module)
  .add('default', () => <WatsonHealthPageScroll32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPageScroll32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPageScroll32 focusable>
      <title>Icon title</title>
    </WatsonHealthPageScroll32>
  ));
