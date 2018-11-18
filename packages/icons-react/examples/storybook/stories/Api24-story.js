import React from 'react';
import { storiesOf } from '@storybook/react';
import Api24 from '../../../es/api/24.js';

storiesOf('Api24', module)
  .add('default', () => <Api24 />)
  .add('with accessibility label', () => (
    <Api24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Api24 aria-label="Icon label">
      <title>Icon title</title>
    </Api24>
  ));
