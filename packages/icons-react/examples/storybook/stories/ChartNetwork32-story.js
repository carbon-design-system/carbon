import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartNetwork32 from '../../../es/chart--network/32.js';

storiesOf('ChartNetwork32', module)
  .add('default', () => <ChartNetwork32 />)
  .add('with accessibility label', () => (
    <ChartNetwork32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartNetwork32 aria-label="Icon label">
      <title>Icon title</title>
    </ChartNetwork32>
  ));
