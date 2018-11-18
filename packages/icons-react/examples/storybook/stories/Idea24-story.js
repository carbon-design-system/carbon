import React from 'react';
import { storiesOf } from '@storybook/react';
import Idea24 from '../../../es/idea/24.js';

storiesOf('Idea24', module)
  .add('default', () => <Idea24 />)
  .add('with accessibility label', () => (
    <Idea24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Idea24 aria-label="Icon label">
      <title>Icon title</title>
    </Idea24>
  ));
