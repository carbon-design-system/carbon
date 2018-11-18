import React from 'react';
import { storiesOf } from '@storybook/react';
import Cognitive20 from '../../../es/cognitive/20.js';

storiesOf('Cognitive20', module)
  .add('default', () => <Cognitive20 />)
  .add('with accessibility label', () => (
    <Cognitive20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cognitive20 aria-label="Icon label">
      <title>Icon title</title>
    </Cognitive20>
  ));
