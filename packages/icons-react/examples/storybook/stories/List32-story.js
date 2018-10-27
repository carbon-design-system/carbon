import React from 'react';
import { storiesOf } from '@storybook/react';
import List32 from '../../../lib/list/32';

storiesOf('List32', module)
  .add('default', () => <List32 />)
  .add('with accessibility label', () => (
    <List32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <List32 focusable>
      <title>Icon title</title>
    </List32>
  ));
