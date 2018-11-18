import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentlyViewed24 from '../../../es/recently-viewed/24.js';

storiesOf('RecentlyViewed24', module)
  .add('default', () => <RecentlyViewed24 />)
  .add('with accessibility label', () => (
    <RecentlyViewed24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecentlyViewed24 aria-label="Icon label">
      <title>Icon title</title>
    </RecentlyViewed24>
  ));
