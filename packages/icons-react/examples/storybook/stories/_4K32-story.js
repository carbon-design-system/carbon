import React from 'react';
import { storiesOf } from '@storybook/react';
import _4K32 from '../../../es/4K/32.js';

storiesOf('_4K32', module)
  .add('default', () => <_4K32 />)
  .add('with accessibility label', () => (
    <_4K32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4K32 aria-label="Icon label">
      <title>Icon title</title>
    </_4K32>
  ));
