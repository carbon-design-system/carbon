import React from 'react';
import { storiesOf } from '@storybook/react';
import FingerprintRecognition32 from '../../../es/fingerprint-recognition/32.js';

storiesOf('FingerprintRecognition32', module)
  .add('default', () => <FingerprintRecognition32 />)
  .add('with accessibility label', () => (
    <FingerprintRecognition32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FingerprintRecognition32 aria-label="Icon label">
      <title>Icon title</title>
    </FingerprintRecognition32>
  ));
