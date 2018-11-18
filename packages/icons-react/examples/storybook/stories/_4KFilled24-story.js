import React from 'react';
import { storiesOf } from '@storybook/react';
import _4KFilled24 from '../../../es/4K--filled/24.js';

storiesOf('_4KFilled24', module)
  .add('default', () => <_4KFilled24 />)
  .add('with accessibility label', () => (
    <_4KFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4KFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </_4KFilled24>
  ));
