import React from 'react';
import { storiesOf } from '@storybook/react';
import Globe20 from '../../../es/globe/20.js';

storiesOf('Globe20', module)
  .add('default', () => <Globe20 />)
  .add('with accessibility label', () => (
    <Globe20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Globe20 aria-label="Icon label">
      <title>Icon title</title>
    </Globe20>
  ));
