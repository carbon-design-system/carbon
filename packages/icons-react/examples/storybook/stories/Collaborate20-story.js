import React from 'react';
import { storiesOf } from '@storybook/react';
import Collaborate20 from '../../../es/collaborate/20.js';

storiesOf('Collaborate20', module)
  .add('default', () => <Collaborate20 />)
  .add('with accessibility label', () => (
    <Collaborate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Collaborate20 aria-label="Icon label">
      <title>Icon title</title>
    </Collaborate20>
  ));
