import React from 'react';
import { storiesOf } from '@storybook/react';
import Star32 from '../../../lib/star/32';

storiesOf('Star32', module)
  .add('default', () => <Star32 />)
  .add('with accessibility label', () => (
    <Star32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Star32 focusable>
      <title>Icon title</title>
    </Star32>
  ));
