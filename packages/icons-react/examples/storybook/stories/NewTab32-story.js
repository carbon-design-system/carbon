import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab32 from '../../../lib/NewTab/32';

storiesOf('NewTab32', module)
  .add('default', () => <NewTab32 />)
  .add('with accessibility label', () => (
    <NewTab32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab32 focusable>
      <title>Icon title</title>
    </NewTab32>
  ));
