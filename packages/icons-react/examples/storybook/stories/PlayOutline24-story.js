import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline24 from '../../../es/play--outline/24.js';

storiesOf('PlayOutline24', module)
  .add('default', () => <PlayOutline24 />)
  .add('with accessibility label', () => (
    <PlayOutline24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline24 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutline24>
  ));
