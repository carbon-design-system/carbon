import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt16 from '../../../es/subtract--alt/16.js';

storiesOf('SubtractAlt16', module)
  .add('default', () => <SubtractAlt16 />)
  .add('with accessibility label', () => (
    <SubtractAlt16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt16 aria-label="Icon label">
      <title>Icon title</title>
    </SubtractAlt16>
  ));
