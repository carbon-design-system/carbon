import React from 'react';
import { storiesOf } from '@storybook/react';
import Column20 from '../../../es/column/20.js';

storiesOf('Column20', module)
  .add('default', () => <Column20 />)
  .add('with accessibility label', () => (
    <Column20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Column20 aria-label="Icon label">
      <title>Icon title</title>
    </Column20>
  ));
