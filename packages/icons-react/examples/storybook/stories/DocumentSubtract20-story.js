import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentSubtract20 from '../../../es/document--subtract/20.js';

storiesOf('DocumentSubtract20', module)
  .add('default', () => <DocumentSubtract20 />)
  .add('with accessibility label', () => (
    <DocumentSubtract20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentSubtract20 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentSubtract20>
  ));
