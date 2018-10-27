import React from 'react';
import { storiesOf } from '@storybook/react';
import Document32 from '../../../lib/document/32';

storiesOf('Document32', module)
  .add('default', () => <Document32 />)
  .add('with accessibility label', () => (
    <Document32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Document32 focusable>
      <title>Icon title</title>
    </Document32>
  ));
