import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_620 from '../../../es/number--6/20.js';

storiesOf('Number_620', module)
  .add('default', () => <Number_620 />)
  .add('with accessibility label', () => (
    <Number_620 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_620 aria-label="Icon label">
      <title>Icon title</title>
    </Number_620>
  ));
