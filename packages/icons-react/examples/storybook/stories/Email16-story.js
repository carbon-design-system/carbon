import React from 'react';
import { storiesOf } from '@storybook/react';
import Email16 from '../../../lib/email/16';

storiesOf('Email16', module)
  .add('default', () => <Email16 />)
  .add('with accessibility label', () => (
    <Email16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Email16 focusable>
      <title>Icon title</title>
    </Email16>
  ));
