import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayOutline16 from '../../../es/play--outline/16.js';

storiesOf('PlayOutline16', module)
  .add('default', () => <PlayOutline16 />)
  .add('with accessibility label', () => (
    <PlayOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </PlayOutline16>
  ));
