import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentlyViewed32 from '../../../es/recently-viewed/32.js';

storiesOf('RecentlyViewed32', module)
  .add('default', () => <RecentlyViewed32 />)
  .add('with accessibility label', () => (
    <RecentlyViewed32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecentlyViewed32 aria-label="Icon label">
      <title>Icon title</title>
    </RecentlyViewed32>
  ));
