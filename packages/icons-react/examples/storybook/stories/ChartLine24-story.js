import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartLine24 from '../../../es/chart--line/24.js';

storiesOf('ChartLine24', module)
  .add('default', () => <ChartLine24 />)
  .add('with accessibility label', () => (
    <ChartLine24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartLine24 aria-label="Icon label">
      <title>Icon title</title>
    </ChartLine24>
  ));
