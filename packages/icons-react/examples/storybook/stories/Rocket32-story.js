import React from 'react';
import { storiesOf } from '@storybook/react';
import Rocket32 from '../../../lib/rocket/32';

storiesOf('Rocket32', module)
  .add('default', () => <Rocket32 />)
  .add('with accessibility label', () => (
    <Rocket32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rocket32 focusable>
      <title>Icon title</title>
    </Rocket32>
  ));
