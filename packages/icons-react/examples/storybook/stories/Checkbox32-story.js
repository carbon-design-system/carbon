import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox32 from '../../../es/checkbox/32.js';

storiesOf('Checkbox32', module)
  .add('default', () => <Checkbox32 />)
  .add('with accessibility label', () => (
    <Checkbox32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkbox32 aria-label="Icon label">
      <title>Icon title</title>
    </Checkbox32>
  ));
