import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_3024 from '../../../es/forward--30/24.js';

storiesOf('Forward_3024', module)
  .add('default', () => <Forward_3024 />)
  .add('with accessibility label', () => (
    <Forward_3024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_3024 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_3024>
  ));
