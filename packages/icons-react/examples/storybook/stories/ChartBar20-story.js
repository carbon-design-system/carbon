import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartBar20 from '../../../es/chart--bar/20.js';

storiesOf('ChartBar20', module)
  .add('default', () => <ChartBar20 />)
  .add('with accessibility label', () => (
    <ChartBar20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartBar20 aria-label="Icon label">
      <title>Icon title</title>
    </ChartBar20>
  ));
