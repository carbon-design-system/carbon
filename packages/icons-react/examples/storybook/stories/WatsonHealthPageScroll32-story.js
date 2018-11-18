import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPageScroll32 from '../../../es/watson-health/page-scroll/32.js';

storiesOf('WatsonHealthPageScroll32', module)
  .add('default', () => <WatsonHealthPageScroll32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPageScroll32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPageScroll32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPageScroll32>
  ));
