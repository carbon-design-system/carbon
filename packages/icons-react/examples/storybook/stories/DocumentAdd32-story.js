import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentAdd32 from '../../../es/document--add/32.js';

storiesOf('DocumentAdd32', module)
  .add('default', () => <DocumentAdd32 />)
  .add('with accessibility label', () => (
    <DocumentAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentAdd32 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentAdd32>
  ));
