import React from 'react';
import { storiesOf } from '@storybook/react';
import Recommend32 from '../../../lib/Recommend/32';

storiesOf('Recommend32', module)
  .add('default', () => <Recommend32 />)
  .add('with accessibility label', () => (
    <Recommend32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recommend32 focusable>
      <title>Icon title</title>
    </Recommend32>
  ));
