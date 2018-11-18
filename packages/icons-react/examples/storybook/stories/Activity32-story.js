import React from 'react';
import { storiesOf } from '@storybook/react';
import Activity32 from '../../../es/activity/32.js';

storiesOf('Activity32', module)
  .add('default', () => <Activity32 />)
  .add('with accessibility label', () => (
    <Activity32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Activity32 aria-label="Icon label">
      <title>Icon title</title>
    </Activity32>
  ));
