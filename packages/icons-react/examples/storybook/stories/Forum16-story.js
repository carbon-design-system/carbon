import React from 'react';
import { storiesOf } from '@storybook/react';
import Forum16 from '../../../es/forum/16.js';

storiesOf('Forum16', module)
  .add('default', () => <Forum16 />)
  .add('with accessibility label', () => (
    <Forum16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forum16 aria-label="Icon label">
      <title>Icon title</title>
    </Forum16>
  ));
