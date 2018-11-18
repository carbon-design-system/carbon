import React from 'react';
import { storiesOf } from '@storybook/react';
import Popup20 from '../../../es/popup/20.js';

storiesOf('Popup20', module)
  .add('default', () => <Popup20 />)
  .add('with accessibility label', () => (
    <Popup20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Popup20 aria-label="Icon label">
      <title>Icon title</title>
    </Popup20>
  ));
