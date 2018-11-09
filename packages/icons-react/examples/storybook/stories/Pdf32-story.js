import React from 'react';
import { storiesOf } from '@storybook/react';
import Pdf32 from '../../../lib/Pdf/32';

storiesOf('Pdf32', module)
  .add('default', () => <Pdf32 />)
  .add('with accessibility label', () => (
    <Pdf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pdf32 focusable>
      <title>Icon title</title>
    </Pdf32>
  ));
