import React from 'react';
import { storiesOf } from '@storybook/react';
import ThumbsUp32 from '../../../lib/thumbs-up/32';

storiesOf('ThumbsUp32', module)
  .add('default', () => <ThumbsUp32 />)
  .add('with accessibility label', () => (
    <ThumbsUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ThumbsUp32 focusable>
      <title>Icon title</title>
    </ThumbsUp32>
  ));
