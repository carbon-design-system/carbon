import React from 'react';
import { storiesOf } from '@storybook/react';
import WrapText24 from '../../../es/wrap-text/24.js';

storiesOf('WrapText24', module)
  .add('default', () => <WrapText24 />)
  .add('with accessibility label', () => (
    <WrapText24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WrapText24 aria-label="Icon label">
      <title>Icon title</title>
    </WrapText24>
  ));
