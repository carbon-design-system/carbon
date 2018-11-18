import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload20 from '../../../es/upload/20.js';

storiesOf('Upload20', module)
  .add('default', () => <Upload20 />)
  .add('with accessibility label', () => (
    <Upload20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Upload20 aria-label="Icon label">
      <title>Icon title</title>
    </Upload20>
  ));
