import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartNetwork20 from '../../../es/chart--network/20.js';

storiesOf('ChartNetwork20', module)
  .add('default', () => <ChartNetwork20 />)
  .add('with accessibility label', () => (
    <ChartNetwork20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChartNetwork20 aria-label="Icon label">
      <title>Icon title</title>
    </ChartNetwork20>
  ));
