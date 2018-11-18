import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignCenter32 from '../../../es/align--center/32.js';

storiesOf('AlignCenter32', module)
  .add('default', () => <AlignCenter32 />)
  .add('with accessibility label', () => (
    <AlignCenter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignCenter32 aria-label="Icon label">
      <title>Icon title</title>
    </AlignCenter32>
  ));
