import React from 'react';
import { storiesOf } from '@storybook/react';
import Activity24 from '../../../es/activity/24.js';

storiesOf('Activity24', module)
  .add('default', () => <Activity24 />)
  .add('with accessibility label', () => (
    <Activity24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Activity24 aria-label="Icon label">
      <title>Icon title</title>
    </Activity24>
  ));
