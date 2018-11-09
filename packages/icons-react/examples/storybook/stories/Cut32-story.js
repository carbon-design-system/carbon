import React from 'react';
import { storiesOf } from '@storybook/react';
import Cut32 from '../../../lib/Cut/32';

storiesOf('Cut32', module)
  .add('default', () => <Cut32 />)
  .add('with accessibility label', () => (
    <Cut32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cut32 focusable>
      <title>Icon title</title>
    </Cut32>
  ));
