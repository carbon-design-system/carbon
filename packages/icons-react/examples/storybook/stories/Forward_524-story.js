import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_524 from '../../../es/forward--5/24.js';

storiesOf('Forward_524', module)
  .add('default', () => <Forward_524 />)
  .add('with accessibility label', () => (
    <Forward_524 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_524 aria-label="Icon label">
      <title>Icon title</title>
    </Forward_524>
  ));
