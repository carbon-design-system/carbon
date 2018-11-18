import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBubble32 from '../../../es/chart--bubble/32.js';

storiesOf('ChartBubble32', module)
  .add('default', () => <ChartBubble32 />)
  .add('with accessibility label', () => (
    <ChartBubble32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBubble32 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBubble32>
  ));
