import React from 'react';
import { storiesOf } from '@storybook/react';
import Email16 from '../../../es/email/16.js';

storiesOf('Email16', module)
  .add('default', () => <Email16 />)
  .add('with accessibility label', () => (
    <Email16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Email16 aria-label="Icon label">
      <title>Icon title</title>
    </Email16>
  ));
