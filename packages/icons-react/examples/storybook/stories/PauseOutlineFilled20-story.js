import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutlineFilled20 from '../../../es/pause--outline--filled/20.js';

storiesOf('PauseOutlineFilled20', module)
  .add('default', () => <PauseOutlineFilled20 />)
  .add('with accessibility label', () => (
    <PauseOutlineFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutlineFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutlineFilled20>
  ));
