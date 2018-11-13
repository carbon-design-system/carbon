import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutlineFilled16 from '../../../lib/PauseOutlineFilled/16';

storiesOf('PauseOutlineFilled16', module)
  .add('default', () => <PauseOutlineFilled16 />)
  .add('with accessibility label', () => (
    <PauseOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutlineFilled16 focusable>
      <title>Icon title</title>
    </PauseOutlineFilled16>
  ));
