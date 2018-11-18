import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt20 from '../../../es/subtract--alt/20.js';

storiesOf('SubtractAlt20', module)
  .add('default', () => <SubtractAlt20 />)
  .add('with accessibility label', () => (
    <SubtractAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </SubtractAlt20>
  ));
