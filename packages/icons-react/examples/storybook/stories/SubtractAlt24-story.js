import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt24 from '../../../es/subtract--alt/24.js';

storiesOf('SubtractAlt24', module)
  .add('default', () => <SubtractAlt24 />)
  .add('with accessibility label', () => (
    <SubtractAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </SubtractAlt24>
  ));
