import React from 'react';
import { storiesOf } from '@storybook/react';
import Purchase32 from '../../../es/purchase/32.js';

storiesOf('Purchase32', module)
  .add('default', () => <Purchase32 />)
  .add('with accessibility label', () => (
    <Purchase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Purchase32 aria-label="Icon label">
      <title>Icon title</title>
    </Purchase32>
  ));
