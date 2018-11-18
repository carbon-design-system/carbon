import React from 'react';
import { storiesOf } from '@storybook/react';
import Van24 from '../../../es/van/24.js';

storiesOf('Van24', module)
  .add('default', () => <Van24 />)
  .add('with accessibility label', () => (
    <Van24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Van24 aria-label="Icon label">
      <title>Icon title</title>
    </Van24>
  ));
