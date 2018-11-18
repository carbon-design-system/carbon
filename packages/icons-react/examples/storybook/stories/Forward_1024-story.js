import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_1024 from '../../../es/forward--10/24.js';

storiesOf('Forward_1024', module)
  .add('default', () => <Forward_1024 />)
  .add('with accessibility label', () => (
    <Forward_1024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_1024 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_1024>
  ));
