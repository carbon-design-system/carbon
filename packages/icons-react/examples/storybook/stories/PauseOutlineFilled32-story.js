import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutlineFilled32 from '../../../lib/pause--outline--filled/32';

storiesOf('PauseOutlineFilled32', module)
  .add('default', () => <PauseOutlineFilled32 />)
  .add('with accessibility label', () => (
    <PauseOutlineFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutlineFilled32 focusable>
      <title>Icon title</title>
    </PauseOutlineFilled32>
  ));
