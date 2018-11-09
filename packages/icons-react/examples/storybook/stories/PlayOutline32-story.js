import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline32 from '../../../lib/PlayOutline/32';

storiesOf('PlayOutline32', module)
  .add('default', () => <PlayOutline32 />)
  .add('with accessibility label', () => (
    <PlayOutline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline32 focusable>
      <title>Icon title</title>
    </PlayOutline32>
  ));
