import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderShared32 from '../../../es/folder--shared/32.js';

storiesOf('FolderShared32', module)
  .add('default', () => <FolderShared32 />)
  .add('with accessibility label', () => (
    <FolderShared32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderShared32 aria-label="Icon label">
      <title>Icon title</title>
    </FolderShared32>
  ));
