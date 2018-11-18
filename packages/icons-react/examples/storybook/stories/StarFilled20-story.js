import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled20 from '../../../es/star--filled/20.js';

storiesOf('StarFilled20', module)
  .add('default', () => <StarFilled20 />)
  .add('with accessibility label', () => (
    <StarFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </StarFilled20>
  ));
