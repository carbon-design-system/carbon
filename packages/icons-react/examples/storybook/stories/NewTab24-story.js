import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab24 from '../../../es/new-tab/24.js';

storiesOf('NewTab24', module)
  .add('default', () => <NewTab24 />)
  .add('with accessibility label', () => (
    <NewTab24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab24 aria-label="Icon label">
      <title>Icon title</title>
    </NewTab24>
  ));
