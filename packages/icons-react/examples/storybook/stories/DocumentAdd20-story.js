import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentAdd20 from '../../../es/document--add/20.js';

storiesOf('DocumentAdd20', module)
  .add('default', () => <DocumentAdd20 />)
  .add('with accessibility label', () => (
    <DocumentAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DocumentAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </DocumentAdd20>
  ));
