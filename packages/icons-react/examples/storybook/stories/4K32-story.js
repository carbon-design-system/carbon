import React from 'react';
import { storiesOf } from '@storybook/react';
import _4K32 from '../../../lib/4K/32';

storiesOf('4K32', module)
  .add('default', () => <_4K32 />)
  .add('with accessibility label', () => (
    <_4K32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4K32 focusable>
      <title>Icon title</title>
    </_4K32>
  ));
