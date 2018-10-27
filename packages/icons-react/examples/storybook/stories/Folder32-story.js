import React from 'react';
import { storiesOf } from '@storybook/react';
import Folder32 from '../../../lib/folder/32';

storiesOf('Folder32', module)
  .add('default', () => <Folder32 />)
  .add('with accessibility label', () => (
    <Folder32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Folder32 focusable>
      <title>Icon title</title>
    </Folder32>
  ));
