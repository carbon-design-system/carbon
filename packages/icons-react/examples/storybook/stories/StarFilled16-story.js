import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled16 from '../../../es/star--filled/16.js';

storiesOf('StarFilled16', module)
  .add('default', () => <StarFilled16 />)
  .add('with accessibility label', () => (
    <StarFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </StarFilled16>
  ));
