import React from 'react';
import { storiesOf } from '@storybook/react';
import Email24 from '../../../es/email/24.js';

storiesOf('Email24', module)
  .add('default', () => <Email24 />)
  .add('with accessibility label', () => (
    <Email24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Email24 aria-label="Icon label">
      <title>Icon title</title>
    </Email24>
  ));
