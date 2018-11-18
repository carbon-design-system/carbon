import React from 'react';
import { storiesOf } from '@storybook/react';
import Folder16 from '../../../es/folder/16.js';

storiesOf('Folder16', module)
  .add('default', () => <Folder16 />)
  .add('with accessibility label', () => (
    <Folder16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Folder16 aria-label="Icon label">
      <title>Icon title</title>
    </Folder16>
  ));
