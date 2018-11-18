import React from 'react';
import { storiesOf } from '@storybook/react';
import Column32 from '../../../es/column/32.js';

storiesOf('Column32', module)
  .add('default', () => <Column32 />)
  .add('with accessibility label', () => (
    <Column32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Column32 aria-label="Icon label">
      <title>Icon title</title>
    </Column32>
  ));
