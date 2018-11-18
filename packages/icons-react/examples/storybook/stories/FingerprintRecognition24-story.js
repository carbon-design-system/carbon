import React from 'react';
import { storiesOf } from '@storybook/react';
import FingerprintRecognition24 from '../../../es/fingerprint-recognition/24.js';

storiesOf('FingerprintRecognition24', module)
  .add('default', () => <FingerprintRecognition24 />)
  .add('with accessibility label', () => (
    <FingerprintRecognition24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FingerprintRecognition24 aria-label="Icon label">
      <title>Icon title</title>
    </FingerprintRecognition24>
  ));
