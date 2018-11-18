import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignCenter24 from '../../../es/align--center/24.js';

storiesOf('AlignCenter24', module)
  .add('default', () => <AlignCenter24 />)
  .add('with accessibility label', () => (
    <AlignCenter24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignCenter24 aria-label="Icon label">
      <title>Icon title</title>
    </AlignCenter24>
  ));
