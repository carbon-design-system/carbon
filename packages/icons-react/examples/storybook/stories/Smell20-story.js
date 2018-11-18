import React from 'react';
import { storiesOf } from '@storybook/react';
import Smell20 from '../../../es/smell/20.js';

storiesOf('Smell20', module)
  .add('default', () => <Smell20 />)
  .add('with accessibility label', () => (
    <Smell20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Smell20 aria-label="Icon label">
      <title>Icon title</title>
    </Smell20>
  ));
