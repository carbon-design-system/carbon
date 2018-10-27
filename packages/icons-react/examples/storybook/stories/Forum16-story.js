import React from 'react';
import { storiesOf } from '@storybook/react';
import Forum16 from '../../../lib/forum/16';

storiesOf('Forum16', module)
  .add('default', () => <Forum16 />)
  .add('with accessibility label', () => (
    <Forum16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forum16 focusable>
      <title>Icon title</title>
    </Forum16>
  ));
