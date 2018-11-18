import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_124 from '../../../es/view--mode-1/24.js';

storiesOf('ViewMode_124', module)
  .add('default', () => <ViewMode_124 />)
  .add('with accessibility label', () => (
    <ViewMode_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_124 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_124>
  ));
