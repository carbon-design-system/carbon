import React from 'react';
import { storiesOf } from '@storybook/react';
import Analytics20 from '../../../es/analytics/20.js';

storiesOf('Analytics20', module)
  .add('default', () => <Analytics20 />)
  .add('with accessibility label', () => (
    <Analytics20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Analytics20 aria-label="Icon label">
      <title>Icon title</title>
    </Analytics20>
  ));
