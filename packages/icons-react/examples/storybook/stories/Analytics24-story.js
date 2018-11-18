import React from 'react';
import { storiesOf } from '@storybook/react';
import Analytics24 from '../../../es/analytics/24.js';

storiesOf('Analytics24', module)
  .add('default', () => <Analytics24 />)
  .add('with accessibility label', () => (
    <Analytics24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Analytics24 aria-label="Icon label">
      <title>Icon title</title>
    </Analytics24>
  ));
