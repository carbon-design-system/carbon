import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBubble24 from '../../../es/chart--bubble/24.js';

storiesOf('ChartBubble24', module)
  .add('default', () => <ChartBubble24 />)
  .add('with accessibility label', () => (
    <ChartBubble24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBubble24 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBubble24>
  ));
