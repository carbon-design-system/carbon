import React from 'react';
import { storiesOf } from '@storybook/react';
import Collaborate32 from '../../../es/collaborate/32.js';

storiesOf('Collaborate32', module)
  .add('default', () => <Collaborate32 />)
  .add('with accessibility label', () => (
    <Collaborate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Collaborate32 aria-label="Icon label">
      <title>Icon title</title>
    </Collaborate32>
  ));
