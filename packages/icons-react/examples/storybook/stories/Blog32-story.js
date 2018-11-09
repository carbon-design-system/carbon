import React from 'react';
import { storiesOf } from '@storybook/react';
import Blog32 from '../../../lib/Blog/32';

storiesOf('Blog32', module)
  .add('default', () => <Blog32 />)
  .add('with accessibility label', () => (
    <Blog32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Blog32 focusable>
      <title>Icon title</title>
    </Blog32>
  ));
