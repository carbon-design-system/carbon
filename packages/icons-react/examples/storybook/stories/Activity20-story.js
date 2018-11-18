import React from 'react';
import { storiesOf } from '@storybook/react';
import Activity20 from '../../../es/activity/20.js';

storiesOf('Activity20', module)
  .add('default', () => <Activity20 />)
  .add('with accessibility label', () => (
    <Activity20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Activity20 aria-label="Icon label">
      <title>Icon title</title>
    </Activity20>
  ));
