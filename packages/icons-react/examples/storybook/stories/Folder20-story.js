import React from 'react';
import { storiesOf } from '@storybook/react';
import Folder20 from '../../../es/folder/20.js';

storiesOf('Folder20', module)
  .add('default', () => <Folder20 />)
  .add('with accessibility label', () => (
    <Folder20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Folder20 aria-label="Icon label">
      <title>Icon title</title>
    </Folder20>
  ));
