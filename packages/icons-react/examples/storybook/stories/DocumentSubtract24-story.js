import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentSubtract24 from '../../../es/document--subtract/24.js';

storiesOf('DocumentSubtract24', module)
  .add('default', () => <DocumentSubtract24 />)
  .add('with accessibility label', () => (
    <DocumentSubtract24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentSubtract24 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentSubtract24>
  ));
