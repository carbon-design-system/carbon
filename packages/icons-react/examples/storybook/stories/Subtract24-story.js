import React from 'react';
import { storiesOf } from '@storybook/react';
import Subtract24 from '../../../es/subtract/24.js';

storiesOf('Subtract24', module)
  .add('default', () => <Subtract24 />)
  .add('with accessibility label', () => (
    <Subtract24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Subtract24 aria-label="Icon label">
      <title>Icon title</title>
    </Subtract24>
  ));
