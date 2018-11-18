import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutlineFilled24 from '../../../es/pause--outline--filled/24.js';

storiesOf('PauseOutlineFilled24', module)
  .add('default', () => <PauseOutlineFilled24 />)
  .add('with accessibility label', () => (
    <PauseOutlineFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutlineFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutlineFilled24>
  ));
