import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBar24 from '../../../es/chart--bar/24.js';

storiesOf('ChartBar24', module)
  .add('default', () => <ChartBar24 />)
  .add('with accessibility label', () => (
    <ChartBar24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBar24 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBar24>
  ));
