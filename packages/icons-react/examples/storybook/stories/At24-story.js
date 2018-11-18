import React from 'react';
import { storiesOf } from '@storybook/react';
import At24 from '../../../es/at/24.js';

storiesOf('At24', module)
  .add('default', () => <At24 />)
  .add('with accessibility label', () => (
    <At24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <At24 aria-label="Icon label">
      <title>Icon title</title>
    </At24>
  ));
