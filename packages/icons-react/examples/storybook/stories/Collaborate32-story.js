import React from 'react';
import { storiesOf } from '@storybook/react';
import Collaborate32 from '../../../lib/collaborate/32';

storiesOf('Collaborate32', module)
  .add('default', () => <Collaborate32 />)
  .add('with accessibility label', () => (
    <Collaborate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Collaborate32 focusable>
      <title>Icon title</title>
    </Collaborate32>
  ));
