import React from 'react';
import { storiesOf } from '@storybook/react';
import Folder24 from '../../../es/folder/24.js';

storiesOf('Folder24', module)
  .add('default', () => <Folder24 />)
  .add('with accessibility label', () => (
    <Folder24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Folder24 aria-label="Icon label">
      <title>Icon title</title>
    </Folder24>
  ));
