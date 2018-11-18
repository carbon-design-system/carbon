import React from 'react';
import { storiesOf } from '@storybook/react';
import Cut24 from '../../../es/cut/24.js';

storiesOf('Cut24', module)
  .add('default', () => <Cut24 />)
  .add('with accessibility label', () => (
    <Cut24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cut24 aria-label="Icon label">
      <title>Icon title</title>
    </Cut24>
  ));
