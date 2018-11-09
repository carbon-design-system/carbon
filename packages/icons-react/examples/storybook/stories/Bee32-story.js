import React from 'react';
import { storiesOf } from '@storybook/react';
import Bee32 from '../../../lib/Bee/32';

storiesOf('Bee32', module)
  .add('default', () => <Bee32 />)
  .add('with accessibility label', () => (
    <Bee32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bee32 focusable>
      <title>Icon title</title>
    </Bee32>
  ));
