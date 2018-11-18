import React from 'react';
import { storiesOf } from '@storybook/react';
import Shuttle20 from '../../../es/shuttle/20.js';

storiesOf('Shuttle20', module)
  .add('default', () => <Shuttle20 />)
  .add('with accessibility label', () => (
    <Shuttle20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Shuttle20 aria-label="Icon label">
      <title>Icon title</title>
    </Shuttle20>
  ));
