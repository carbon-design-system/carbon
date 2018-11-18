import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPageScroll24 from '../../../es/watson-health/page-scroll/24.js';

storiesOf('WatsonHealthPageScroll24', module)
  .add('default', () => <WatsonHealthPageScroll24 />)
  .add('with accessibility label', () => (
    <WatsonHealthPageScroll24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPageScroll24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPageScroll24>
  ));
