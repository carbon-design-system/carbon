import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentlyViewed32 from '../../../lib/recently-viewed/32';

storiesOf('RecentlyViewed32', module)
  .add('default', () => <RecentlyViewed32 />)
  .add('with accessibility label', () => (
    <RecentlyViewed32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecentlyViewed32 focusable>
      <title>Icon title</title>
    </RecentlyViewed32>
  ));
