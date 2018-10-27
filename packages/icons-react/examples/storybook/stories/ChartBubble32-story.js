import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBubble32 from '../../../lib/chart--bubble/32';

storiesOf('ChartBubble32', module)
  .add('default', () => <ChartBubble32 />)
  .add('with accessibility label', () => (
    <ChartBubble32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBubble32 focusable>
      <title>Icon title</title>
    </ChartBubble32>
  ));
