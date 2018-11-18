import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderAdd20 from '../../../es/folder--add/20.js';

storiesOf('FolderAdd20', module)
  .add('default', () => <FolderAdd20 />)
  .add('with accessibility label', () => (
    <FolderAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </FolderAdd20>
  ));
