import React from 'react';
import { storiesOf } from '@storybook/react';
import ThumbsUp24 from '../../../es/thumbs-up/24.js';

storiesOf('ThumbsUp24', module)
  .add('default', () => <ThumbsUp24 />)
  .add('with accessibility label', () => (
    <ThumbsUp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ThumbsUp24 aria-label="Icon label">
      <title>Icon title</title>
    </ThumbsUp24>
  ));
