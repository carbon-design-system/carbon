import React from 'react';
import { storiesOf } from '@storybook/react';
import Scan24 from '../../../es/scan/24.js';

storiesOf('Scan24', module)
  .add('default', () => <Scan24 />)
  .add('with accessibility label', () => (
    <Scan24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scan24 aria-label="Icon label">
      <title>Icon title</title>
    </Scan24>
  ));
