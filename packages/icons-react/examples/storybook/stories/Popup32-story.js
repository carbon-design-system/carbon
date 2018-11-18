import React from 'react';
import { storiesOf } from '@storybook/react';
import Popup32 from '../../../es/popup/32.js';

storiesOf('Popup32', module)
  .add('default', () => <Popup32 />)
  .add('with accessibility label', () => (
    <Popup32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Popup32 aria-label="Icon label">
      <title>Icon title</title>
    </Popup32>
  ));
