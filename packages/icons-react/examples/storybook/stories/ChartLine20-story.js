import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartLine20 from '../../../es/chart--line/20.js';

storiesOf('ChartLine20', module)
  .add('default', () => <ChartLine20 />)
  .add('with accessibility label', () => (
    <ChartLine20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartLine20 aria-label="Icon label">
      <title>Icon title</title>
    </ChartLine20>
  ));
