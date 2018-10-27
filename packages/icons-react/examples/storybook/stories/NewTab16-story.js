import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab16 from '../../../lib/new-tab/16';

storiesOf('NewTab16', module)
  .add('default', () => <NewTab16 />)
  .add('with accessibility label', () => (
    <NewTab16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab16 focusable>
      <title>Icon title</title>
    </NewTab16>
  ));
