import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse16 from '../../../lib/misuse/16';

storiesOf('Misuse16', module)
  .add('default', () => <Misuse16 />)
  .add('with accessibility label', () => (
    <Misuse16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse16 focusable>
      <title>Icon title</title>
    </Misuse16>
  ));
