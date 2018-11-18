import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutline20 from '../../../es/pause--outline/20.js';

storiesOf('PauseOutline20', module)
  .add('default', () => <PauseOutline20 />)
  .add('with accessibility label', () => (
    <PauseOutline20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutline20 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutline20>
  ));
