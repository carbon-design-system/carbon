import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentSubtract32 from '../../../es/document--subtract/32.js';

storiesOf('DocumentSubtract32', module)
  .add('default', () => <DocumentSubtract32 />)
  .add('with accessibility label', () => (
    <DocumentSubtract32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentSubtract32 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentSubtract32>
  ));
