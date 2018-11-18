import React from 'react';
import { storiesOf } from '@storybook/react';
import Bee20 from '../../../es/bee/20.js';

storiesOf('Bee20', module)
  .add('default', () => <Bee20 />)
  .add('with accessibility label', () => (
    <Bee20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bee20 aria-label="Icon label">
      <title>Icon title</title>
    </Bee20>
  ));
