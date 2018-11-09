import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_232 from '../../../lib/ViewMode_2/32';

storiesOf('ViewMode_232', module)
  .add('default', () => <ViewMode_232 />)
  .add('with accessibility label', () => (
    <ViewMode_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_232 focusable>
      <title>Icon title</title>
    </ViewMode_232>
  ));
