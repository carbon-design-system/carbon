import React from 'react';
import { storiesOf } from '@storybook/react';
import Row20 from '../../../es/row/20.js';

storiesOf('Row20', module)
  .add('default', () => <Row20 />)
  .add('with accessibility label', () => (
    <Row20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Row20 aria-label="Icon label">
      <title>Icon title</title>
    </Row20>
  ));
