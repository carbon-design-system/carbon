import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignRight32 from '../../../lib/align--right/32';

storiesOf('AlignRight32', module)
  .add('default', () => <AlignRight32 />)
  .add('with accessibility label', () => (
    <AlignRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignRight32 focusable>
      <title>Icon title</title>
    </AlignRight32>
  ));
