import React from 'react';
import { storiesOf } from '@storybook/react';
import Scan32 from '../../../es/scan/32.js';

storiesOf('Scan32', module)
  .add('default', () => <Scan32 />)
  .add('with accessibility label', () => (
    <Scan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scan32 aria-label="Icon label">
      <title>Icon title</title>
    </Scan32>
  ));
