import React from 'react';
import { storiesOf } from '@storybook/react';
import Document32 from '../../../es/document/32.js';

storiesOf('Document32', module)
  .add('default', () => <Document32 />)
  .add('with accessibility label', () => (
    <Document32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Document32 aria-label="Icon label">
      <title>Icon title</title>
    </Document32>
  ));
