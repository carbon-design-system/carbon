import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentlyViewed20 from '../../../es/recently-viewed/20.js';

storiesOf('RecentlyViewed20', module)
  .add('default', () => <RecentlyViewed20 />)
  .add('with accessibility label', () => (
    <RecentlyViewed20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecentlyViewed20 aria-label="Icon label">
      <title>Icon title</title>
    </RecentlyViewed20>
  ));
