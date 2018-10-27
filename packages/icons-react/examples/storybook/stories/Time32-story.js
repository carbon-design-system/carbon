import React from 'react';
import { storiesOf } from '@storybook/react';
import Time32 from '../../../lib/time/32';

storiesOf('Time32', module)
  .add('default', () => <Time32 />)
  .add('with accessibility label', () => (
    <Time32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Time32 focusable>
      <title>Icon title</title>
    </Time32>
  ));
