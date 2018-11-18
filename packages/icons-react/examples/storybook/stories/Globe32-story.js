import React from 'react';
import { storiesOf } from '@storybook/react';
import Globe32 from '../../../es/globe/32.js';

storiesOf('Globe32', module)
  .add('default', () => <Globe32 />)
  .add('with accessibility label', () => (
    <Globe32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Globe32 aria-label="Icon label">
      <title>Icon title</title>
    </Globe32>
  ));
