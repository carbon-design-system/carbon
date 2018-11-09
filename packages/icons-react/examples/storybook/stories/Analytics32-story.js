import React from 'react';
import { storiesOf } from '@storybook/react';
import Analytics32 from '../../../lib/Analytics/32';

storiesOf('Analytics32', module)
  .add('default', () => <Analytics32 />)
  .add('with accessibility label', () => (
    <Analytics32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Analytics32 focusable>
      <title>Icon title</title>
    </Analytics32>
  ));
