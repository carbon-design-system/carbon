import React from 'react';
import { storiesOf } from '@storybook/react';
import WrapText20 from '../../../es/wrap-text/20.js';

storiesOf('WrapText20', module)
  .add('default', () => <WrapText20 />)
  .add('with accessibility label', () => (
    <WrapText20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WrapText20 aria-label="Icon label">
      <title>Icon title</title>
    </WrapText20>
  ));
