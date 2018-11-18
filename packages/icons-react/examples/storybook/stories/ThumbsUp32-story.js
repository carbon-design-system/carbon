import React from 'react';
import { storiesOf } from '@storybook/react';
import ThumbsUp32 from '../../../es/thumbs-up/32.js';

storiesOf('ThumbsUp32', module)
  .add('default', () => <ThumbsUp32 />)
  .add('with accessibility label', () => (
    <ThumbsUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ThumbsUp32 aria-label="Icon label">
      <title>Icon title</title>
    </ThumbsUp32>
  ));
