import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_224 from '../../../es/view--mode-2/24.js';

storiesOf('ViewMode_224', module)
  .add('default', () => <ViewMode_224 />)
  .add('with accessibility label', () => (
    <ViewMode_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_224 aria-label="Icon label">
      <title>Icon title</title>
    </ViewMode_224>
  ));
