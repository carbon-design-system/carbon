import React from 'react';
import { storiesOf } from '@storybook/react';
import Insert32 from '../../../lib/insert/32';

storiesOf('Insert32', module)
  .add('default', () => <Insert32 />)
  .add('with accessibility label', () => (
    <Insert32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Insert32 focusable>
      <title>Icon title</title>
    </Insert32>
  ));
