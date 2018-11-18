import React from 'react';
import { storiesOf } from '@storybook/react';
import Rss32 from '../../../es/rss/32.js';

storiesOf('Rss32', module)
  .add('default', () => <Rss32 />)
  .add('with accessibility label', () => (
    <Rss32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rss32 aria-label="Icon label">
      <title>Icon title</title>
    </Rss32>
  ));
