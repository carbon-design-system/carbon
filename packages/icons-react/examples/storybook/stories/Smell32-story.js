import React from 'react';
import { storiesOf } from '@storybook/react';
import Smell32 from '../../../lib/smell/32';

storiesOf('Smell32', module)
  .add('default', () => <Smell32 />)
  .add('with accessibility label', () => (
    <Smell32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Smell32 focusable>
      <title>Icon title</title>
    </Smell32>
  ));
