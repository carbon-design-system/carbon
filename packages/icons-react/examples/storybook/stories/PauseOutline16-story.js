import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutline16 from '../../../lib/pause--outline/16';

storiesOf('PauseOutline16', module)
  .add('default', () => <PauseOutline16 />)
  .add('with accessibility label', () => (
    <PauseOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutline16 focusable>
      <title>Icon title</title>
    </PauseOutline16>
  ));
