import React from 'react';
import { storiesOf } from '@storybook/react';
import ViewMode_132 from '../../../lib/ViewMode_1/32';

storiesOf('ViewMode_132', module)
  .add('default', () => <ViewMode_132 />)
  .add('with accessibility label', () => (
    <ViewMode_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ViewMode_132 focusable>
      <title>Icon title</title>
    </ViewMode_132>
  ));
