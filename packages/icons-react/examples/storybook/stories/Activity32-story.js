import React from 'react';
import { storiesOf } from '@storybook/react';
import Activity32 from '../../../lib/activity/32';

storiesOf('Activity32', module)
  .add('default', () => <Activity32 />)
  .add('with accessibility label', () => (
    <Activity32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Activity32 focusable>
      <title>Icon title</title>
    </Activity32>
  ));
