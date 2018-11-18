import React from 'react';
import { storiesOf } from '@storybook/react';
import Terminal20 from '../../../es/terminal/20.js';

storiesOf('Terminal20', module)
  .add('default', () => <Terminal20 />)
  .add('with accessibility label', () => (
    <Terminal20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Terminal20 aria-label="Icon label">
      <title>Icon title</title>
    </Terminal20>
  ));
