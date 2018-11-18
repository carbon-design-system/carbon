import React from 'react';
import { storiesOf } from '@storybook/react';
import Maximize24 from '../../../es/maximize/24.js';

storiesOf('Maximize24', module)
  .add('default', () => <Maximize24 />)
  .add('with accessibility label', () => (
    <Maximize24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Maximize24 aria-label="Icon label">
      <title>Icon title</title>
    </Maximize24>
  ));
