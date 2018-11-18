import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignRight32 from '../../../es/align--right/32.js';

storiesOf('AlignRight32', module)
  .add('default', () => <AlignRight32 />)
  .add('with accessibility label', () => (
    <AlignRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignRight32 aria-label="Icon label">
      <title>Icon title</title>
    </AlignRight32>
  ));
