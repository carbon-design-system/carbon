import React from 'react';
import { storiesOf } from '@storybook/react';
import Paste20 from '../../../es/paste/20.js';

storiesOf('Paste20', module)
  .add('default', () => <Paste20 />)
  .add('with accessibility label', () => (
    <Paste20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Paste20 aria-label="Icon label">
      <title>Icon title</title>
    </Paste20>
  ));
