import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPageScroll20 from '../../../es/watson-health/page-scroll/20.js';

storiesOf('WatsonHealthPageScroll20', module)
  .add('default', () => <WatsonHealthPageScroll20 />)
  .add('with accessibility label', () => (
    <WatsonHealthPageScroll20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPageScroll20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPageScroll20>
  ));
