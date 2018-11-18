import React from 'react';
import { storiesOf } from '@storybook/react';
import Idea32 from '../../../es/idea/32.js';

storiesOf('Idea32', module)
  .add('default', () => <Idea32 />)
  .add('with accessibility label', () => (
    <Idea32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Idea32 aria-label="Icon label">
      <title>Icon title</title>
    </Idea32>
  ));
