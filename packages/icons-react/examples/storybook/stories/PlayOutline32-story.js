import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline32 from '../../../es/play--outline/32.js';

storiesOf('PlayOutline32', module)
  .add('default', () => <PlayOutline32 />)
  .add('with accessibility label', () => (
    <PlayOutline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline32 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutline32>
  ));
