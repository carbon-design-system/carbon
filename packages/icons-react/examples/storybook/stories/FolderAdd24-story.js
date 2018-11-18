import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderAdd24 from '../../../es/folder--add/24.js';

storiesOf('FolderAdd24', module)
  .add('default', () => <FolderAdd24 />)
  .add('with accessibility label', () => (
    <FolderAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </FolderAdd24>
  ));
