import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab32 from '../../../es/new-tab/32.js';

storiesOf('NewTab32', module)
  .add('default', () => <NewTab32 />)
  .add('with accessibility label', () => (
    <NewTab32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab32 aria-label="Icon label">
      <title>Icon title</title>
    </NewTab32>
  ));
