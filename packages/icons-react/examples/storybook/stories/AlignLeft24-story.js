import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignLeft24 from '../../../es/align--left/24.js';

storiesOf('AlignLeft24', module)
  .add('default', () => <AlignLeft24 />)
  .add('with accessibility label', () => (
    <AlignLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </AlignLeft24>
  ));
