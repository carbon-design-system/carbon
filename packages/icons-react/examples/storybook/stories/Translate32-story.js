import React from 'react';
import { storiesOf } from '@storybook/react';
import Translate32 from '../../../es/translate/32.js';

storiesOf('Translate32', module)
  .add('default', () => <Translate32 />)
  .add('with accessibility label', () => (
    <Translate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Translate32 aria-label="Icon label">
      <title>Icon title</title>
    </Translate32>
  ));
