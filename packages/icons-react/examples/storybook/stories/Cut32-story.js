import React from 'react';
import { storiesOf } from '@storybook/react';
import Cut32 from '../../../es/cut/32.js';

storiesOf('Cut32', module)
  .add('default', () => <Cut32 />)
  .add('with accessibility label', () => (
    <Cut32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cut32 aria-label="Icon label">
      <title>Icon title</title>
    </Cut32>
  ));
