import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignRight24 from '../../../es/align--right/24.js';

storiesOf('AlignRight24', module)
  .add('default', () => <AlignRight24 />)
  .add('with accessibility label', () => (
    <AlignRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignRight24 aria-label="Icon label">
      <title>Icon title</title>
    </AlignRight24>
  ));
