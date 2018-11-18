import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderAdd32 from '../../../es/folder--add/32.js';

storiesOf('FolderAdd32', module)
  .add('default', () => <FolderAdd32 />)
  .add('with accessibility label', () => (
    <FolderAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderAdd32 aria-label="Icon label">
      <title>Icon title</title>
    </FolderAdd32>
  ));
