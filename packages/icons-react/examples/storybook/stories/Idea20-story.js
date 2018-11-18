import React from 'react';
import { storiesOf } from '@storybook/react';
import Idea20 from '../../../es/idea/20.js';

storiesOf('Idea20', module)
  .add('default', () => <Idea20 />)
  .add('with accessibility label', () => (
    <Idea20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Idea20 aria-label="Icon label">
      <title>Icon title</title>
    </Idea20>
  ));
