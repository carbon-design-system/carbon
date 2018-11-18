import React from 'react';
import { storiesOf } from '@storybook/react';
import Reply20 from '../../../es/reply/20.js';

storiesOf('Reply20', module)
  .add('default', () => <Reply20 />)
  .add('with accessibility label', () => (
    <Reply20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reply20 aria-label="Icon label">
      <title>Icon title</title>
    </Reply20>
  ));
