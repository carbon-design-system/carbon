import React from 'react';
import { storiesOf } from '@storybook/react';
import Blog20 from '../../../es/blog/20.js';

storiesOf('Blog20', module)
  .add('default', () => <Blog20 />)
  .add('with accessibility label', () => (
    <Blog20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Blog20 aria-label="Icon label">
      <title>Icon title</title>
    </Blog20>
  ));
