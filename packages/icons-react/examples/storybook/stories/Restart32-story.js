import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart32 from '../../../lib/Restart/32';

storiesOf('Restart32', module)
  .add('default', () => <Restart32 />)
  .add('with accessibility label', () => (
    <Restart32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart32 focusable>
      <title>Icon title</title>
    </Restart32>
  ));
