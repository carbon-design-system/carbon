import React from 'react';
import { storiesOf } from '@storybook/react';
import _4K20 from '../../../es/4K/20.js';

storiesOf('_4K20', module)
  .add('default', () => <_4K20 />)
  .add('with accessibility label', () => (
    <_4K20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4K20 aria-label="Icon label">
      <title>Icon title</title>
    </_4K20>
  ));
