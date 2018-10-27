import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked16 from '../../../lib/locked/16';

storiesOf('Locked16', module)
  .add('default', () => <Locked16 />)
  .add('with accessibility label', () => (
    <Locked16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked16 focusable>
      <title>Icon title</title>
    </Locked16>
  ));
