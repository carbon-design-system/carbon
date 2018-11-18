import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentAdd24 from '../../../es/document--add/24.js';

storiesOf('DocumentAdd24', module)
  .add('default', () => <DocumentAdd24 />)
  .add('with accessibility label', () => (
    <DocumentAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentAdd24>
  ));
