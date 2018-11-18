import React from 'react';
import { storiesOf } from '@storybook/react';
import Document24 from '../../../es/document/24.js';

storiesOf('Document24', module)
  .add('default', () => <Document24 />)
  .add('with accessibility label', () => (
    <Document24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Document24 aria-label="Icon label">
      <title>Icon title</title>
    </Document24>
  ));
