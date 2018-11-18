import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipForward20 from '../../../es/skip--forward/20.js';

storiesOf('SkipForward20', module)
  .add('default', () => <SkipForward20 />)
  .add('with accessibility label', () => (
    <SkipForward20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipForward20 aria-label="Icon label">
      <title>Icon title</title>
    </SkipForward20>
  ));
