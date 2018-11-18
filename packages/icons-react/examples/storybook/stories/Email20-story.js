import React from 'react';
import { storiesOf } from '@storybook/react';
import Email20 from '../../../es/email/20.js';

storiesOf('Email20', module)
  .add('default', () => <Email20 />)
  .add('with accessibility label', () => (
    <Email20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Email20 aria-label="Icon label">
      <title>Icon title</title>
    </Email20>
  ));
