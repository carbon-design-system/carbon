import React from 'react';
import { storiesOf } from '@storybook/react';
import _4KFilled20 from '../../../es/4K--filled/20.js';

storiesOf('_4KFilled20', module)
  .add('default', () => <_4KFilled20 />)
  .add('with accessibility label', () => (
    <_4KFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4KFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </_4KFilled20>
  ));
