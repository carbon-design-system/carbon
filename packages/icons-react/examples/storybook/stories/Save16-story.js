import React from 'react';
import { storiesOf } from '@storybook/react';
import Save16 from '../../../es/save/16.js';

storiesOf('Save16', module)
  .add('default', () => <Save16 />)
  .add('with accessibility label', () => (
    <Save16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Save16 aria-label="Icon label">
      <title>Icon title</title>
    </Save16>
  ));
