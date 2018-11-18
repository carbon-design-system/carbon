import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled24 from '../../../es/star--filled/24.js';

storiesOf('StarFilled24', module)
  .add('default', () => <StarFilled24 />)
  .add('with accessibility label', () => (
    <StarFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </StarFilled24>
  ));
