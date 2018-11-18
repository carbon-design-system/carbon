import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutline24 from '../../../es/pause--outline/24.js';

storiesOf('PauseOutline24', module)
  .add('default', () => <PauseOutline24 />)
  .add('with accessibility label', () => (
    <PauseOutline24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutline24 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutline24>
  ));
