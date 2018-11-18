import React from 'react';
import { storiesOf } from '@storybook/react';
import Forum32 from '../../../es/forum/32.js';

storiesOf('Forum32', module)
  .add('default', () => <Forum32 />)
  .add('with accessibility label', () => (
    <Forum32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forum32 aria-label="Icon label">
      <title>Icon title</title>
    </Forum32>
  ));
