import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartNetwork24 from '../../../es/chart--network/24.js';

storiesOf('ChartNetwork24', module)
  .add('default', () => <ChartNetwork24 />)
  .add('with accessibility label', () => (
    <ChartNetwork24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartNetwork24 aria-label="Icon label">
      <title>Icon title</title>
    </ChartNetwork24>
  ));
