import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_132 from '../../../es/view--mode-1/32.js';

storiesOf('ViewMode_132', module)
  .add('default', () => <ViewMode_132 />)
  .add('with accessibility label', () => (
    <ViewMode_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_132 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_132>
  ));
