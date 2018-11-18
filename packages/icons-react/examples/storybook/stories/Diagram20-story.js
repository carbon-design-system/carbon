import React from 'react';
import { storiesOf } from '@storybook/react';
import Diagram20 from '../../../es/diagram/20.js';

storiesOf('Diagram20', module)
  .add('default', () => <Diagram20 />)
  .add('with accessibility label', () => (
    <Diagram20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Diagram20 aria-label="Icon label">
      <title>Icon title</title>
    </Diagram20>
  ));
