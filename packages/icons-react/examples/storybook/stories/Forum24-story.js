import React from 'react';
import { storiesOf } from '@storybook/react';
import Forum24 from '../../../es/forum/24.js';

storiesOf('Forum24', module)
  .add('default', () => <Forum24 />)
  .add('with accessibility label', () => (
    <Forum24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forum24 aria-label="Icon label">
      <title>Icon title</title>
    </Forum24>
  ));
