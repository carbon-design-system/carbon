import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartNetwork32 from '../../../lib/chart--network/32';

storiesOf('ChartNetwork32', module)
  .add('default', () => <ChartNetwork32 />)
  .add('with accessibility label', () => (
    <ChartNetwork32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartNetwork32 focusable>
      <title>Icon title</title>
    </ChartNetwork32>
  ));
