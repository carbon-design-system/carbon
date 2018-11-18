import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt32 from '../../../es/subtract--alt/32.js';

storiesOf('SubtractAlt32', module)
  .add('default', () => <SubtractAlt32 />)
  .add('with accessibility label', () => (
    <SubtractAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </SubtractAlt32>
  ));
