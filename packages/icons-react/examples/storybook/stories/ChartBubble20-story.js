import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBubble20 from '../../../es/chart--bubble/20.js';

storiesOf('ChartBubble20', module)
  .add('default', () => <ChartBubble20 />)
  .add('with accessibility label', () => (
    <ChartBubble20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBubble20 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBubble20>
  ));
