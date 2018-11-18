import React from 'react';
import { storiesOf } from '@storybook/react';
import Blog32 from '../../../es/blog/32.js';

storiesOf('Blog32', module)
  .add('default', () => <Blog32 />)
  .add('with accessibility label', () => (
    <Blog32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Blog32 aria-label="Icon label">
      <title>Icon title</title>
    </Blog32>
  ));
