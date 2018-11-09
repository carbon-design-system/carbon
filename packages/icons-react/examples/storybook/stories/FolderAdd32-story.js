import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderAdd32 from '../../../lib/FolderAdd/32';

storiesOf('FolderAdd32', module)
  .add('default', () => <FolderAdd32 />)
  .add('with accessibility label', () => (
    <FolderAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderAdd32 focusable>
      <title>Icon title</title>
    </FolderAdd32>
  ));
