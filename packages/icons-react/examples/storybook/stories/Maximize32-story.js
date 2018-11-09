import React from 'react';
import { storiesOf } from '@storybook/react';
import Maximize32 from '../../../lib/Maximize/32';

storiesOf('Maximize32', module)
  .add('default', () => <Maximize32 />)
  .add('with accessibility label', () => (
    <Maximize32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Maximize32 focusable>
      <title>Icon title</title>
    </Maximize32>
  ));
