import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline20 from '../../../es/play--outline/20.js';

storiesOf('PlayOutline20', module)
  .add('default', () => <PlayOutline20 />)
  .add('with accessibility label', () => (
    <PlayOutline20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline20 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutline20>
  ));
