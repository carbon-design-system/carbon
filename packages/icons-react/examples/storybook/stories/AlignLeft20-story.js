import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignLeft20 from '../../../es/align--left/20.js';

storiesOf('AlignLeft20', module)
  .add('default', () => <AlignLeft20 />)
  .add('with accessibility label', () => (
    <AlignLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </AlignLeft20>
  ));
