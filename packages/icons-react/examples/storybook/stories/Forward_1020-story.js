import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_1020 from '../../../es/forward--10/20.js';

storiesOf('Forward_1020', module)
  .add('default', () => <Forward_1020 />)
  .add('with accessibility label', () => (
    <Forward_1020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_1020 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_1020>
  ));
