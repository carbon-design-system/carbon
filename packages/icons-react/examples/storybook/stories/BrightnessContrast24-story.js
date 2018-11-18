import React from 'react';
import { storiesOf } from '@storybook/react';
import BrightnessContrast24 from '../../../es/brightness-contrast/24.js';

storiesOf('BrightnessContrast24', module)
  .add('default', () => <BrightnessContrast24 />)
  .add('with accessibility label', () => (
    <BrightnessContrast24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <BrightnessContrast24 aria-label="Icon label">
      <title>Icon title</title>
    </BrightnessContrast24>
  ));
