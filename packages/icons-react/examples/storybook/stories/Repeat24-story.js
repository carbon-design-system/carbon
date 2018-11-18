import React from 'react';
import { storiesOf } from '@storybook/react';
import Repeat24 from '../../../es/repeat/24.js';

storiesOf('Repeat24', module)
  .add('default', () => <Repeat24 />)
  .add('with accessibility label', () => (
    <Repeat24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Repeat24 aria-label="Icon label">
      <title>Icon title</title>
    </Repeat24>
  ));
