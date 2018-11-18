import React from 'react';
import { storiesOf } from '@storybook/react';
import Hd20 from '../../../es/HD/20.js';

storiesOf('Hd20', module)
  .add('default', () => <Hd20 />)
  .add('with accessibility label', () => (
    <Hd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hd20 aria-label="Icon label">
      <title>Icon title</title>
    </Hd20>
  ));
