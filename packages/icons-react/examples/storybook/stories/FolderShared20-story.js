import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderShared20 from '../../../es/folder--shared/20.js';

storiesOf('FolderShared20', module)
  .add('default', () => <FolderShared20 />)
  .add('with accessibility label', () => (
    <FolderShared20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderShared20 aria-label="Icon label">
      <title>Icon title</title>
    </FolderShared20>
  ));
