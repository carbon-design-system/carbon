import React from 'react';
import { storiesOf } from '@storybook/react';
import User24 from '../../../es/user/24.js';

storiesOf('User24', module)
  .add('default', () => <User24 />)
  .add('with accessibility label', () => (
    <User24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User24 aria-label="Icon label">
      <title>Icon title</title>
    </User24>
  ));
