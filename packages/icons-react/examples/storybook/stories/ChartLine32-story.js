import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartLine32 from '../../../es/chart--line/32.js';

storiesOf('ChartLine32', module)
  .add('default', () => <ChartLine32 />)
  .add('with accessibility label', () => (
    <ChartLine32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartLine32 aria-label="Icon label">
      <title>Icon title</title>
    </ChartLine32>
  ));
