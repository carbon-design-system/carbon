import React from 'react';
import { storiesOf } from '@storybook/react';
import Play16 from '../../../es/play/16.js';

storiesOf('Play16', module)
  .add('default', () => <Play16 />)
  .add('with accessibility label', () => (
    <Play16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play16 aria-label="Icon label">
      <title>Icon title</title>
    </Play16>
  ));
