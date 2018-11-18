import React from 'react';
import { storiesOf } from '@storybook/react';
import Row24 from '../../../es/row/24.js';

storiesOf('Row24', module)
  .add('default', () => <Row24 />)
  .add('with accessibility label', () => (
    <Row24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Row24 aria-label="Icon label">
      <title>Icon title</title>
    </Row24>
  ));
