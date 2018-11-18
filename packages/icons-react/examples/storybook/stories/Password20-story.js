import React from 'react';
import { storiesOf } from '@storybook/react';
import Password20 from '../../../es/password/20.js';

storiesOf('Password20', module)
  .add('default', () => <Password20 />)
  .add('with accessibility label', () => (
    <Password20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Password20 aria-label="Icon label">
      <title>Icon title</title>
    </Password20>
  ));
