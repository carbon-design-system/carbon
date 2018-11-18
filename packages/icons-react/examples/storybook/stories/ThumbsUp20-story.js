import React from 'react';
import { storiesOf } from '@storybook/react';
import ThumbsUp20 from '../../../es/thumbs-up/20.js';

storiesOf('ThumbsUp20', module)
  .add('default', () => <ThumbsUp20 />)
  .add('with accessibility label', () => (
    <ThumbsUp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ThumbsUp20 aria-label="Icon label">
      <title>Icon title</title>
    </ThumbsUp20>
  ));
