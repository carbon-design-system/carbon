import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox24 from '../../../es/checkbox/24.js';

storiesOf('Checkbox24', module)
  .add('default', () => <Checkbox24 />)
  .add('with accessibility label', () => (
    <Checkbox24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkbox24 aria-label="Icon label">
      <title>Icon title</title>
    </Checkbox24>
  ));
