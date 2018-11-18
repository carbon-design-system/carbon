import React from 'react';
import { storiesOf } from '@storybook/react';
import Blog24 from '../../../es/blog/24.js';

storiesOf('Blog24', module)
  .add('default', () => <Blog24 />)
  .add('with accessibility label', () => (
    <Blog24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Blog24 aria-label="Icon label">
      <title>Icon title</title>
    </Blog24>
  ));
