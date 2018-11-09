import React from 'react';
import { storiesOf } from '@storybook/react';
import Rotate32 from '../../../lib/Rotate/32';

storiesOf('Rotate32', module)
  .add('default', () => <Rotate32 />)
  .add('with accessibility label', () => (
    <Rotate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rotate32 focusable>
      <title>Icon title</title>
    </Rotate32>
  ));
