import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_224 from '../../../es/touch--2/24.js';

storiesOf('Touch_224', module)
  .add('default', () => <Touch_224 />)
  .add('with accessibility label', () => (
    <Touch_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_224 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_224>
  ));
