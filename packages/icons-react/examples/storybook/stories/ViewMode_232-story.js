import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_232 from '../../../es/view--mode-2/32.js';

storiesOf('ViewMode_232', module)
  .add('default', () => <ViewMode_232 />)
  .add('with accessibility label', () => (
    <ViewMode_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_232 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_232>
  ));
