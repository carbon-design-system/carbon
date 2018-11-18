import React from 'react';
import { storiesOf } from '@storybook/react';
import Hd24 from '../../../es/HD/24.js';

storiesOf('Hd24', module)
  .add('default', () => <Hd24 />)
  .add('with accessibility label', () => (
    <Hd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hd24 aria-label="Icon label">
      <title>Icon title</title>
    </Hd24>
  ));
