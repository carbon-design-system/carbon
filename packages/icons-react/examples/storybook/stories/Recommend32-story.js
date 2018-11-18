import React from 'react';
import { storiesOf } from '@storybook/react';
import Recommend32 from '../../../es/recommend/32.js';

storiesOf('Recommend32', module)
  .add('default', () => <Recommend32 />)
  .add('with accessibility label', () => (
    <Recommend32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recommend32 aria-label="Icon label">
      <title>Icon title</title>
    </Recommend32>
  ));
