import React from 'react';
import { storiesOf } from '@storybook/react';
import BrightnessContrast20 from '../../../es/brightness-contrast/20.js';

storiesOf('BrightnessContrast20', module)
  .add('default', () => <BrightnessContrast20 />)
  .add('with accessibility label', () => (
    <BrightnessContrast20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <BrightnessContrast20 aria-label="Icon label">
      <title>Icon title</title>
    </BrightnessContrast20>
  ));
