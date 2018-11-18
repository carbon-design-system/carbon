import React from 'react';
import { storiesOf } from '@storybook/react';
import Email32 from '../../../es/email/32.js';

storiesOf('Email32', module)
  .add('default', () => <Email32 />)
  .add('with accessibility label', () => (
    <Email32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Email32 aria-label="Icon label">
      <title>Icon title</title>
    </Email32>
  ));
