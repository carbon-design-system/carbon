import React from 'react';
import { storiesOf } from '@storybook/react';
import Document20 from '../../../es/document/20.js';

storiesOf('Document20', module)
  .add('default', () => <Document20 />)
  .add('with accessibility label', () => (
    <Document20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Document20 aria-label="Icon label">
      <title>Icon title</title>
    </Document20>
  ));
