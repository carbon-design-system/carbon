import React from 'react';
import { storiesOf } from '@storybook/react';
import BrightnessContrast32 from '../../../es/brightness-contrast/32.js';

storiesOf('BrightnessContrast32', module)
  .add('default', () => <BrightnessContrast32 />)
  .add('with accessibility label', () => (
    <BrightnessContrast32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <BrightnessContrast32 aria-label="Icon label">
      <title>Icon title</title>
    </BrightnessContrast32>
  ));
