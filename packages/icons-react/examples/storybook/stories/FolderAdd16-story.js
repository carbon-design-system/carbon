import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderAdd16 from '../../../lib/folder-add/16';

storiesOf('FolderAdd16', module)
  .add('default', () => <FolderAdd16 />)
  .add('with accessibility label', () => (
    <FolderAdd16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderAdd16 focusable>
      <title>Icon title</title>
    </FolderAdd16>
  ));
