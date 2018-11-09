import React from 'react';
import { storiesOf } from '@storybook/react';
import Rss32 from '../../../lib/Rss/32';

storiesOf('Rss32', module)
  .add('default', () => <Rss32 />)
  .add('with accessibility label', () => (
    <Rss32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rss32 focusable>
      <title>Icon title</title>
    </Rss32>
  ));
