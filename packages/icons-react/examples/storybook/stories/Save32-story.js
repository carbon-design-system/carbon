import React from 'react';
import { storiesOf } from '@storybook/react';
import Save32 from '../../../es/save/32.js';

storiesOf('Save32', module)
  .add('default', () => <Save32 />)
  .add('with accessibility label', () => (
    <Save32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Save32 aria-label="Icon label">
      <title>Icon title</title>
    </Save32>
  ));
