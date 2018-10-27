import React from 'react';
import { storiesOf } from '@storybook/react';
import Translate32 from '../../../lib/translate/32';

storiesOf('Translate32', module)
  .add('default', () => <Translate32 />)
  .add('with accessibility label', () => (
    <Translate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Translate32 focusable>
      <title>Icon title</title>
    </Translate32>
  ));
