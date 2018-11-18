import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_120 from '../../../es/view--mode-1/20.js';

storiesOf('ViewMode_120', module)
  .add('default', () => <ViewMode_120 />)
  .add('with accessibility label', () => (
    <ViewMode_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_120 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_120>
  ));
