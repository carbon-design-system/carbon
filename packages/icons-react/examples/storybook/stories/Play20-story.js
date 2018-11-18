import React from 'react';
import { storiesOf } from '@storybook/react';
import Play20 from '../../../es/play/20.js';

storiesOf('Play20', module)
  .add('default', () => <Play20 />)
  .add('with accessibility label', () => (
    <Play20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play20 aria-label="Icon label">
      <title>Icon title</title>
    </Play20>
  ));
