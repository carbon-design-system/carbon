import React from 'react';
import { storiesOf } from '@storybook/react';
import Rocket20 from '../../../es/rocket/20.js';

storiesOf('Rocket20', module)
  .add('default', () => <Rocket20 />)
  .add('with accessibility label', () => (
    <Rocket20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rocket20 aria-label="Icon label">
      <title>Icon title</title>
    </Rocket20>
  ));
