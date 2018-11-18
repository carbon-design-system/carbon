import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderShared24 from '../../../es/folder--shared/24.js';

storiesOf('FolderShared24', module)
  .add('default', () => <FolderShared24 />)
  .add('with accessibility label', () => (
    <FolderShared24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderShared24 aria-label="Icon label">
      <title>Icon title</title>
    </FolderShared24>
  ));
