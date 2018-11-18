import React from 'react';
import { storiesOf } from '@storybook/react';
import Api20 from '../../../es/api/20.js';

storiesOf('Api20', module)
  .add('default', () => <Api20 />)
  .add('with accessibility label', () => (
    <Api20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Api20 aria-label="Icon label">
      <title>Icon title</title>
    </Api20>
  ));
