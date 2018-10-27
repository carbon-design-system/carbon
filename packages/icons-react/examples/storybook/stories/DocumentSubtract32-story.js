import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentSubtract32 from '../../../lib/document--subtract/32';

storiesOf('DocumentSubtract32', module)
  .add('default', () => <DocumentSubtract32 />)
  .add('with accessibility label', () => (
    <DocumentSubtract32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentSubtract32 focusable>
      <title>Icon title</title>
    </DocumentSubtract32>
  ));
