import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize20 from '../../../es/minimize/20.js';

storiesOf('Minimize20', module)
  .add('default', () => <Minimize20 />)
  .add('with accessibility label', () => (
    <Minimize20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize20 aria-label="Icon label">
      <title>Icon title</title>
    </Minimize20>
  ));
