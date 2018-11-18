import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBar32 from '../../../es/chart--bar/32.js';

storiesOf('ChartBar32', module)
  .add('default', () => <ChartBar32 />)
  .add('with accessibility label', () => (
    <ChartBar32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBar32 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBar32>
  ));
