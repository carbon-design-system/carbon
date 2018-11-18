import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_220 from '../../../es/view--mode-2/20.js';

storiesOf('ViewMode_220', module)
  .add('default', () => <ViewMode_220 />)
  .add('with accessibility label', () => (
    <ViewMode_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_220 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_220>
  ));
