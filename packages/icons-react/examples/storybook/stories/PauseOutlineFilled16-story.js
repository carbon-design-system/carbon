import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutlineFilled16 from '../../../es/pause--outline--filled/16.js';

storiesOf('PauseOutlineFilled16', module)
  .add('default', () => <PauseOutlineFilled16 />)
  .add('with accessibility label', () => (
    <PauseOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutlineFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutlineFilled16>
  ));
