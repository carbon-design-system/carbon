import React from 'react';
import { storiesOf } from '@storybook/react';
import _4KFilled32 from '../../../lib/4K--filled/32';

storiesOf('4KFilled32', module)
  .add('default', () => <_4KFilled32 />)
  .add('with accessibility label', () => (
    <_4KFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4KFilled32 focusable>
      <title>Icon title</title>
    </_4KFilled32>
  ));
