import React from 'react';
import { storiesOf } from '@storybook/react';
import _4KFilled32 from '../../../es/4K--filled/32.js';

storiesOf('_4KFilled32', module)
  .add('default', () => <_4KFilled32 />)
  .add('with accessibility label', () => (
    <_4KFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4KFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </_4KFilled32>
  ));
